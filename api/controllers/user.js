import User from '../models/User.js';
import createError from '../utils/error.js';
import bcrypt from 'bcryptjs';
export const updateUser = async (req, res, next) => {
  try {
    const updateData = req.body;

    const validUpdateData = {};

    // Extract fields with non-empty values
    Object.entries(updateData).forEach(([key, value]) => {
      if (value !== '') {
        validUpdateData[key] = value;
      }
    });
    if (validUpdateData.password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      validUpdateData.password = hash;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: validUpdateData },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    switch (Object.keys(err.keyPattern)[0]) {
      case 'username':
        return next(createError(404, 'Username already exist!'));
      case 'email':
        return next(createError(404, 'Email already exist!'));
      default:
    }
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User deleted!');
  } catch (err) {
    next(err);
  }
};
export const findUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
export const findUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
export const countUsers = async (req, res, next) => {
  try {
    const usersCount = await User.countDocuments();
   
    res.status(200).json(
      {count: usersCount },
    );
  } catch (err) {
    next(err);
  }
};
