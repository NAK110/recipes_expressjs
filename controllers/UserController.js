import AsyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

export const user = AsyncHandler(async (req, res) => {
    return res.status(200).json({
        message: 'Welcome user'
    })
})

export const admin = AsyncHandler(async (req, res) => {
    return res.status(200).json({
        message: 'Welcome admin',
        user: req.user
    })
})

export const getAllUser = AsyncHandler(async (req, res) => {
    const users = await User.getAllUser();

    if (!users) {
        res.status(404);
        throw new Error('No recipes found');
    }
    res.status(200).json(users);
})