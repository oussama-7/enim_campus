import express from "express"
import { forgotPassword, login, logout, register} from "../controllers/auth.js";
const router = express.Router();
router.post('/login',login);
router.post('/register',register);

router.post('/logout',logout);
router.post('/forgotPassword',forgotPassword);


export default router