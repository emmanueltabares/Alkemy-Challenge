import express from 'express';
import { movieController } from '../controllers/movie';
import asyncHandler from 'express-async-handler'

const router = express.Router();

router.get('/', asyncHandler(movieController.getMovie) ); 
router.post('/', asyncHandler(movieController.addMovie) );
router.put('/:id', asyncHandler(movieController.putMovie) );
router.delete('/:id', asyncHandler(movieController.deleteMovie) ); 

export default router;