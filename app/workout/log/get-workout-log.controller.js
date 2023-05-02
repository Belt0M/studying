import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'
import { calculateMinutes } from '../../utills/calculate-minutes.utils.js'

// @desc    Get workoutLog
// @route   GET /api/workouts/log/:workoutId
// @access  Private

export const getWorkoutLog = asyncHandler(async (req, res) => {
	const workoutLog = await prisma.workoutLog.findUnique({
		where: {
			id: +req.params.id
		},
		include: {
			workout: {
				include: {
					exercises: true
				}
			},
			exerciselogs: {
				orderBy: {
					id: 'asc'
				},
				include: {
					exercise: true
				}
			}
		}
	})

	if (!workoutLog) {
		res.status(404)
		throw new Error('Workout log not found')
	}

	const minutes = calculateMinutes(workoutLog.workout.exercises.length)

	res.json({ ...workoutLog, minutes })
})
