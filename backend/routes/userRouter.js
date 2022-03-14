import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from '../models/userModel.js';
import {  isAdmin,generateToken, isAuth } from '../utils.js'; 

const userRouter = express.Router();


userRouter.post(
    '/signin',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
          const validPass = await bcrypt.compare(req.body.password, user.password);
        if (validPass) {
            res.send({
            _id: user._id,
            username: user.username,
            isAdmin: user.isAdmin,
            token: generateToken(user),
            });
            return;
        }
        }
        res.status(401).send({ message: 'Invalid email or password' });
    })
);


userRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id);
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    })
);

userRouter.get(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const users = await User.find({});
      res.send(users);
    })
);

userRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id);
      if (user) {
        user.username = req.body.username || user.username;
        user.isAdmin = Boolean(req.body.isAdmin);
         user.isAdmin = req.body.isAdmin || user.isAdmin;
        const updatedUser = await user.save();
        res.send({ message: 'User Updated', user: updatedUser });
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    })
);

userRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.post(
    '/register',
    expressAsyncHandler(async (req, res) => {
      const user = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8),
      });
      const createdUser = await user.save();
      res.send({
        _id: createdUser._id,
        username: createdUser.username,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser),
      });
    })
);

// userRouter.post("/createadmin", async(req,res)=>{
//   try{
//     const user = new User({
//       username: 'Admin',
//       password: bcrypt.hashSync('999999', 8),
//       isAdmin: true
//     });
//   const newUser = await user.save();
//   res.send(newUser);
//   } catch (error){
//     res.send({message: 'Invalid email or password'});
//   }     
// });

userRouter.post("/createuser", async(req,res)=>{
  try{
    const user = new User({
      username: 'user2',
      password: bcrypt.hashSync('234567', 8),
      isAdmin: false
    });
  const newUser = await user.save();
  res.send(newUser);
  } catch (error){
    res.send({message: 'Invalid email or password'});
  }     
});

export default userRouter;