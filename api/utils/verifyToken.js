import jwt from 'jsonwebtoken';
import createError from './error.js';

export const verifyToken = (req, res, next) => {
  // const token = req.cookies.access_token;
  // const token = localStorage.getItem('access_token', tokenValue);
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(createError(401, 'You are not authenticated!'));
  }

  const token = authHeader.split(' ')[1];
  console.log('token', token);
  if (!token) {
    return next(createError(401, 'You are not authenticated!'));
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, 'Token is not valid!'));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    next();
  } else {
    return next(createError(403, 'You are not authorized!'));
  }
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
