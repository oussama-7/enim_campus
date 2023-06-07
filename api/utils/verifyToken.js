import jwt from 'jsonwebtoken';
import createError from './error.js';
import User from '../models/User.js';

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token; // Retrieve the token from the 'access_token' cookie

//   if (!token) {
//     return next(createError(401, 'You are not authenticated!'));
//   }
  
  

//   jwt.verify(token, process.env.JWT, (err, user) => {
//     if (err) return next(createError(403, 'Token is not valid!'));
//     console.log(user);
//     req.user = user;
//     next();
//   });
// };
export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token; // Retrieve the token from the 'access_token' cookie

  if (!token) {
    return next(createError(401, 'You are not authenticated!'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(createError(401, 'User not found!'));
    }

    req.user = user;
    next();
  } catch (err) {
    return next(createError(403, 'Token is not valid!'));
  }
};



export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    next();
  } else {
    return next(createError(403, 'You are not authorized!'));
  }
});
};
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, 'You are not authorized!'));
    }
  });
};
