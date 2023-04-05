import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { calculateMinutes } from '../utills/calculate-minutes.utils.js'

// @desc    Create workout
// @route   POST /api/workouts
// @access  Private

export const createWorkout = asyncHandler(async (req, res) => {
	const { name, exerciseIds } = req.body

	const isExist = await prisma.workout.findUnique({
		where: {
			name
		}
	})

	if (isExist) {
		res.status(400)
		throw new Error('Workout already exists')
	}

	const workout = await prisma.workout.create({
		data: {
			name,
			exercises: {
				connect: exerciseIds.map(id => ({ id: +id }))
			}
		}
	})

	res.json(workout)
})

// @desc    Get workout
// @route   Get /api/workouts/:id
// @access  Private

export const getWorkout = asyncHandler(async (req, res) => {
	const workout = await prisma.workout.findUnique({
		where: {
			id: +req.params.id
		},
		include: {
			exercises: true
		}
	})

	if(!workout){
		res.status(404)
		throw new Error("Workout not found")
	}

	const minutes = calculateMinutes(workout.exercises.length)

	res.json({ ...workout, minutes })
})

// @desc    Get workouts
// @route   Get /api/workouts
// @access  Private

export const getWorkouts = asyncHandler(async (req, res) => {
	const workouts = await prisma.workout.findMany({
		orderBy: {
			createdAt: 'desc'
		},
		include: {
			exercises: true
		}
	})

	if(!workouts){
		res.status(404)
		throw new Error("Workouts not found")
	}

	res.json(workouts)
})

// @desc    Update workout
// @route   Put /api/workouts/:id
// @access  Private

export const updateWorkout = asyncHandler(async (req, res) => {
	const { name, exerciseIds } = req.body

	try {
		const workout = await prisma.workout.update({
			where: {
				id: +req.params.id
			},
			data: {
				name,
				exercises: {
					set: exerciseIds.map(id => ({ id: +id }))
				}
			}
		})

		res.json(workout)
	} catch (error) {
		res.status(404)
		throw new Error('Workout not found')
	}
})

// @desc    Delete workout
// @route   Delete /api/workouts/:id
// @access  Private

export const deleteWorkout = asyncHandler(async (req, res) => {
	try {
		const workout = await prisma.workout.delete({
			where: {
				id: +req.params.id
			}
		})

		res.json({ message: 'Workout deleted' })
	} catch (error) {
		res.status(404)
		throw new Error('Workout not found')
	}
})
