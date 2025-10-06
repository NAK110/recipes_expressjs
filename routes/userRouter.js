import express from 'express'
import { admin, user } from '../controllers/UserController.js'
import { verifyToken, requireRole } from '../middleware/AuthMiddleware.js'

const userRoute = express.Router()

userRoute.post('/user', user)
userRoute.post('/admin', verifyToken, requireRole('admin'), admin)

export default userRoute