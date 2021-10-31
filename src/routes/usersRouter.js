import { userController } from '../controllers/user';
import express from 'express'
import asyncHandler from 'express-async-handler'


const router = express.Router()

router.post('/login', asyncHandler(userController.login))
router.post('/register', asyncHandler(userController.register))

export default router;