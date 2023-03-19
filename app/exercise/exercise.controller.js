import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// Git Test

// @desc    Create exercise
// @route   POST /api/exercises
// @access  Private

export const createExercise = asyncHandler(async (req, res) => {
	const { name, muscle, sets, times, iconPath } = req.body

	const isExist = await prisma.exercise.findUnique({
		where: {
			name
		}
	})

	if (isExist) {
		res.status(400)
		throw new Error('Exercise already exists')
	}

	const exercise = await prisma.exercise.create({
		data: {
			name,
            muscle,
			sets,
			times,
            iconPath
		}
	})

	res.json(exercise)
})

// @desc    Get exercises
// @route   Get /api/exercises
// @access  Private

export const getExercises = asyncHandler(async(req, res) => {
    const exercises = await prisma.exercise.findMany()

    res.json(exercises)
})
