import express from 'express';
import {
  deleteUser,
  findUser,
  findUsers,
  updateUser,
} from '../controllers/user.js';
import expressAsyncHandler from 'express-async-handler';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';
const router = express.Router();

router.get('/', verifyAdmin, findUsers);
router.get('/', (req, res) => {
  res.send('hello, this is users endpoint?');
});
router.get(
  '/',
  verifyToken,
  verifyAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

// router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("hello user you are logged in.")
// });
// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("hello user you are logged in and you can delete your account.")
// });
// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("hello admin you are logged in and you can delete all accounts.")
// });

//UPDATE
router.put('/:id', verifyUser, updateUser);
//DELETE
router.delete('/:id', verifyUser, deleteUser);
//GET
router.get('/:id', verifyUser, findUser);
//GET ALL

export default router;
