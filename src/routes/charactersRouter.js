import express from 'express';
import { characterController } from '../controllers/character';
import asyncHandler from 'express-async-handler'

const router = express.Router();

router.get('/', asyncHandler(characterController.getCharacters) );
router.post('/', asyncHandler(characterController.addCharacter) );
router.put('/:id', asyncHandler(characterController.putCharacter) );
router.delete('/:id', asyncHandler(characterController.deleteCharacter) );

export default router;