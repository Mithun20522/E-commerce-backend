import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const registerUser = async (req, res) => {
  try {
    const {username, email, password} = req.body;
    User.findOne({email})
    .then(async (user) => {
      if(user) return res.status(400).send('User Already Exist');
      const newUser = new User({
        username,
        email,
        password
      })
      await newUser.save();
      return res.status(201).send(newUser);
    })
    .catch((err) => res.status(500).send({message: 'error occured', err}))
  } catch (error) {
    return res.status(500).send('Internal server error: ', error);
  }
};

export const loginUser = async(req, res) => {
  try {
    const {email, password} = req.body;
    User.findOne({email, password})
    .then((user) => {
      if(user) return res.status(201).send('Login Successfull');
      return res.status(404).send('User not found');
    })
    .catch((err) => {
      return res.status(500).send('Internal server error', err);
    })
  } catch (error) {
    return res.status(500).send('Internal server error', error);
  }
}
