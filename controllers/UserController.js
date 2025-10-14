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

export const createUser = AsyncHandler(async (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }
    if (role && !['user', 'admin'].includes(role)) {
        res.status(400);
        throw new Error('Invalid role. Must be either "user" or "admin"');
    }

    const user = await User.create(req.body);

    res.status(201).json({
        message: 'User created successfully',
        user: user
    });
})

export const updateUser = AsyncHandler(async (req, res) => {
    const updatedUser = await User.update(req.params.id, req.body);

    if (!updatedUser) {
        res.status(404);
        throw new Error('User not found');
    }


    res.status(200).json({
        message: `Update user successful for id: ${req.params.id}`
    });
});

export const deleteUser = AsyncHandler(async (req, res) => {
    const deleteUser = await User.delete(req.params.id);

    if (!deleteUser) {
        res.status(404);
        throw new Error('User not found');
    }

    res.status(200).json({ message: `Delete successful for user ${req.params.id}` });
})
