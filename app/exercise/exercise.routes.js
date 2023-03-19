import express from 'express'
import { protect } from '../middleware/auth.middleware.js';
import { createExercise, getExercises } from './exercise.controller.js';

const router = express.Router()

router.route('/').post(protect, createExercise).get(protect, getExercises)

export default router;
