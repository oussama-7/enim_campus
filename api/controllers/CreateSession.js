import Session from "../models/SessionModel.js";
import bcrypt from "bcryptjs";
import createError from "../utils/error.js";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import cors from 'cors';


export const create = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newSession = new Session({
            ...req.body,
            password: hash

        })
        try {
            await newSession.save();
        } catch (err) {


            switch (Object.keys(err.keyPattern)[0]) {

                case "codePin":
                    return next(createError(404, "codePin already exist!"));
                default:
            }



        }
        const session = await Session.findOne({ sujetStage: req.body.sujetStage });
        const token = jwt.sign({ id: session._id, isAdmin: session.isAdmin }, process.env.JWT,);
        const { codePin, isAdmin, ...otherDetails } = session._doc;

        res.cookie("access_token", token,).status(200).json({ ...otherDetails });

    } catch (err) {
        next(err);
    }
}