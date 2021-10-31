import express from 'express';
import charactersRouter from './charactersRouter';
import usersRouter from './usersRouter';
import moviesRouter from './moviesRouter';
import { checkToken } from '../middlewares/token';

const router = express.Router()

router.use('/characters', /* checkToken */ charactersRouter);
router.use('/movies', moviesRouter)
router.use('/auth', usersRouter)

export default router;