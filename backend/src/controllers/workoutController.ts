import { RequestHandler } from "express";
import WorkoutModel from "../models/Workout";
import ExerciseModel from "../models/Exercise";
import { ValidationError } from "../middleware/errors";

export const createWorkout: RequestHandler = async (req, res, next) => {
  try {
    const workoutName = req.body.workoutName;
    const exercises = req.body.exercises;
    const notes = req.body.notes;

    if (!workoutName || !exercises || !Array.isArray(exercises)) {
      throw new ValidationError("Missing or invalid required fields");
    }

    const exerciseDocs = await Promise.all(
      exercises.map(async (exercise: any) => {
        return ExerciseModel.findOneAndUpdate(
          {
            workoutName,
            name: exercise.name,
          },
          exercise,
          { new: true, upsert: true }
        ).exec();
      })
    );

    // Find all exercises with same workoutName
    const allExercises = await ExerciseModel.find({ workoutName }).exec();

    //Get Exercise IDs

    const exerciseIds = allExercises.map((exercise) => exercise._id);

    // Create the workout with linked exercises

    const newWorkout = new WorkoutModel({
      workoutName,
      exercises: exercises,
      notes: notes,
    });

    await newWorkout.save();

    res.status(201).json(newWorkout);
  } catch (error) {
    next(error);
  }
};
