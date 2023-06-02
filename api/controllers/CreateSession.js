import Session from "../models/SessionModel.js";
import bcrypt from "bcryptjs";
import createError from "../utils/error.js";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import cors from 'cors';


export const create = async (req, res, next) => {
    const newSession = new Session(req.body);

    try {
        const savedSession = await newSession.save();
        res.status(200).json(savedSession);
    } catch (err) {
        next(err);
    }
};