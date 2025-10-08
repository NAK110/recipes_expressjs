import express from 'express'
import { admin, getAllUser, user } from '../controllers/UserController.js'
import { verifyToken, requireRole } from '../middleware/AuthMiddleware.js'

const userRoute = express.Router()

userRoute.post('/user', user)
userRoute.post('/admin', verifyToken, requireRole('admin'), admin)
userRoute.get('/users', verifyToken, requireRole('admin'), getAllUser)

export default userRoute