import { RequestHandler } from "express";
import WorkoutModel from "../models/Workout";
import ExerciseModel from "../models/Exercise";
import { IExercise } from "../models/Exercise";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { createExercise, updateExercise } from "../services/exerciseService";

interface WorkoutBody {
  workoutName?: string;
  exercises?: IExercise[];
  notes?: string;
}

export const createWorkout: RequestHandler<
  unknown,
  unknown,
  WorkoutBody,
  unknown
> = async (req, res, next) => {
  try {
    const workoutName = req.body.workoutName;
    const exercises = req.body.exercises;
    const notes = req.body.notes;

    if (!workoutName || !exercises || !Array.isArray(exercises)) {
      throw createHttpError(400, "Missing or Invalid Workout Fields");
    }

    const exerciseDocs = await Promise.all(
      exercises.map(async (exercise: any) => {
        const newExercise = await createExercise(exercise);
        await newExercise.save();
        return newExercise._id;
      })
    );

    const newWorkout = new WorkoutModel({
      workoutName,
      exercises: exerciseDocs,
      notes,
    });

    await newWorkout.save();

    res.status(201).json(newWorkout);
  } catch (error) {
    next(error);
  }
};

export const getWorkouts: RequestHandler = async (req, res, next) => {
  try {
    const workouts = await WorkoutModel.find().populate("exercises").exec();
    res.status(200).json(workouts);
  } catch (error) {
    next(error);
  }
};

export const getWorkout: RequestHandler = async (req, res, next) => {
  const workoutId = req.params.workoutId;
  try {
    if (!mongoose.isValidObjectId(workoutId)) {
      throw createHttpError(400, "Invalid workout id");
    }

    const workout = await WorkoutModel.findById(workoutId)
      .populate("exercises")
      .exec();

    if (!workout) {
      throw createHttpError(404, "Workout Not Found");
    }

    res.status(200).json(workout);
  } catch (error) {
    next(error);
  }
};

interface UpdateWorkoutParams {
  workoutId: string;
}

interface UpdateWorkoutBody {
  workoutName?: string;
  exercises?: Partial<IExercise>[];
  notes?: string;
}

// export const updateWorkout: RequestHandler<
//   UpdateWorkoutParams,
//   unknown,
//   UpdateWorkoutBody,
//   unknown
// > = async (req, res, next) => {
//   const workoutId = req.params.workoutId;

//   const newWorkoutName = req.body.workoutName;
//   const newExercises = req.body.exercises;
//   const newNotes = req.body.notes;

//   try {
//     if (!mongoose.isValidObjectId(workoutId)) {
//       throw createHttpError(400, "Invalid Workout Id");
//     }

//     if (!newWorkoutName) {
//       throw createHttpError(400, "You cannot update a workout without a name");
//     }

//     if (!newExercises) {
//       throw createHttpError(
//         400,
//         "You cannot update a workout without exercises"
//       );
//     }

//     const workout = await WorkoutModel.findById(workoutId)
//       .populate("exercises")
//       .exec();

//     if (!workout) {
//       throw createHttpError(404, "Workout not found");
//     }

//     workout.workoutName = newWorkoutName;
//     workout.notes = newNotes;

//     if (newExercises) {
//       for (const exercise of newExercises) {
//         if ((exercise as IExercise)._id) {
//           await updateExercise((exercise as IExercise)._id, exercise);
//         } else {
//           const requiredFields: Required<IExercise> = {
//             workoutName: newWorkoutName, // Ensure this is set correctly
//             name: exercise.name!,
//             sets: exercise.sets!,
//             reps: exercise.reps!,
//             weight: exercise.weight || 0,

//           };
//           const newExercise = await createExercise(exercise);
//           workout.exercises.push(newExercise._id as  mongoose.Types.ObjectId);
//       }
//     }

//     const updatedWorkout = await workout.save();

//     res.status(200).json(updatedWorkout);
//   } catch (error) {
//     next(error);
//   }
// };
