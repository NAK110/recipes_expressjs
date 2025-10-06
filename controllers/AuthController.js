import AsyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

export const register = AsyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
    try {
        const user = await User.create(req.body);

        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        return res.status(400).json({
            message: 'User cannot be registered/created',
            error: error.message
        });
    }
})

export const login = AsyncHandler(async (req, res) => {
    const { username, password } = req.body
    
    //console.log('Login attempt:', { username, password });
    if (!username || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const user = await User.findUsername(username)

    if (!user) {
        res.status(401)
        throw new Error('Invalid username or password')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        res.status(401)
        throw new Error('Invalid username or password')
    }

    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET, { expiresIn: "1h" }
    )

    return res.status(200).json({
        message: 'Login successful',
        token: token,
        user: {
            id: user.id,
            username: user.username,
            role: user.role
        } 
    })
})