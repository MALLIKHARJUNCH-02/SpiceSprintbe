
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from '../models/user.js'


const router = express.Router();


router.post("/signup", async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const checkExisting = await User.findOne({email});

        if (checkExisting) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password:hashPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch(error){
          res.status(500).json({ error: "Server error" });
    }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({
      message: "Login successful",
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


export default router;