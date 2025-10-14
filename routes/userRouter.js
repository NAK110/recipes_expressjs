import express from 'express'
import { admin, createUser, deleteUser, getAllUser, updateUser, user } from '../controllers/UserController.js'
import { verifyToken, requireRole } from '../middleware/AuthMiddleware.js'

const userRoute = express.Router()

userRoute.post('/user', user)
userRoute.post('/admin', verifyToken, requireRole('admin'), admin)
userRoute.route('/').get(verifyToken, requireRole('admin'), getAllUser).post(verifyToken, requireRole('admin'), createUser)
userRoute.route('/:id').put(verifyToken, requireRole('admin'), updateUser).delete(verifyToken, requireRole('admin'), deleteUser)

export default userRoute