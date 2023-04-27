import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc    Create exercise
// @route   POST /api/exercises
// @access  Private

export const createExercise = asyncHandler(async (req, res) => {
	const { name, muscle, times, iconPath } = req.body

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
			times,
			iconPath
		}
	})

	res.json(exercise)
})

// @desc    Get exercises
// @route   Get /api/exercises
// @access  Private

export const getExercises = asyncHandler(async (req, res) => {
	const exercises = await prisma.exercise.findMany({
		orderBy: {
			createdAt: 'desc'
		}
	})

	res.json(exercises)
})

// @desc    Update exercise
// @route   Put /api/exercises/:id
// @access  Private

export const updateExercise = asyncHandler(async (req, res) => {
	const { name, muscle, times, iconPath } = req.body

	try {
		const exercise = await prisma.exercise.update({
			where: {
				id: +req.params.id
			},
			data: {
				name,
				muscle,
				times,
				iconPath
			}
		})

		res.json(exercise)
	} catch (error) {
		res.status(404)
		throw new Error('Exercise not found')
	}
})

// @desc    Delete exercise
// @route   Delete /api/exercises/:id
// @access  Private

export const deleteExercise = asyncHandler(async (req, res) => {
	try {
		const exercise = await prisma.exercise.delete({
			where: {
				id: +req.params.id
			}
		})

		res.json({ message: 'Exercise deleted' })
	} catch (error) {
		res.status(404)
		throw new Error('Exercise not found')
	}
})
