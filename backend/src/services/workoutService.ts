import createHttpError from "http-errors";
import mongoose, { Types } from "mongoose";
import WorkoutModel from "../models/Workout";
import Workout, { IWorkout } from "../models/Workout";
import { updateExercise, createExercise } from "./exerciseService";
import ExerciseModel, { IExercise } from "models/Exercise";
import { deleteExercise } from "./exerciseService";
import { Day } from "types/types";

interface WorkoutData {
  userId?: Types.ObjectId;
  workoutName: string;
  exercises: IExercise[];
  day: Day;
  notes?: string;
}

export const createWorkout = async (workoutData: WorkoutData) => {
  const { userId, workoutName, exercises, day, notes } = workoutData;

  const existingWorkout = await WorkoutModel.findOne({
    workoutName: workoutName,
  });

  if (existingWorkout) {
    throw createHttpError(
      400,
      `Workout with the name "${workoutName}" already exists.`
    );
  }

  try {
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
      day,
      userId,
    });

    await newWorkout.save();

    const populatedWorkout = await WorkoutModel.findById(newWorkout._id)
      .populate("exercises")
      .exec();

    return populatedWorkout;
  } catch (error) {
    if (error instanceof createHttpError.HttpError) {
      throw error;
    }

    throw createHttpError(
      500,
      "An unexpected workout service error has occured"
    );
  }
};

export const getWorkout = async (
  workoutId: Types.ObjectId,
  userId: Types.ObjectId
) => {
  const workout = await WorkoutModel.findOne({ _id: workoutId, userId: userId })
    .populate("exercises")
    .exec();

  if (!workout) {
    throw createHttpError(404, "Workout Not Found");
  }

  return workout;
};

export const getWorkouts = async (userId: Types.ObjectId) => {
  if (!userId) {
    throw createHttpError(401, "User not authenticated");
  }

  const workouts = await WorkoutModel.find({ userId: userId })
    .populate("exercises")
    .exec();

  return workouts;
};

export const getWorkoutsForDay = async (day: Day, userId: Types.ObjectId) => {
  const workouts = await WorkoutModel.find({
    userId: userId,
    day: day,
  })
    .populate("exercises")
    .exec();

  return workouts;
};

interface UpdateWorkoutData {
  workoutName?: string;
  exercises?: Partial<IExercise>[];
  day?: Day;
  notes?: string;
}

export const updateWorkout = async (
  workoutId: Types.ObjectId,
  updateData: UpdateWorkoutData,
  userId: Types.ObjectId
) => {
  const { workoutName, exercises, notes, day } = updateData;

  const workout = await WorkoutModel.findOne({
    _id: workoutId,
    userId: userId,
  }).exec();

  if (!workout) {
    throw createHttpError(404, "Workout Not Found");
  }

  if (workoutName !== undefined) {
    workout.workoutName = workoutName;
  }

  if (notes !== undefined) {
    workout.notes = notes;
  }

  if (day !== undefined) {
    workout.day = day;
  }

  if (exercises && Array.isArray(exercises)) {
    const currentExerciseIds = workout.exercises.map((exericse: any) =>
      exericse._id.toString()
    );

    const updatedExerciseIds = await Promise.all(
      exercises.map(async (exercise) => {
        if (exercise._id) {
          const updatedExercise = await updateExercise(
            exercise._id as Types.ObjectId,
            exercise
          );
          if (updatedExercise) {
            return updatedExercise._id.toString();
          }
        } else {
          const newExercise = await createExercise(exercise as IExercise);

          return newExercise._id.toString();
        }
        return null;
      })
    );

    const validUpdatedExerciseIds = updatedExerciseIds.filter(
      (id) => id !== null && id !== undefined
    ) as string[];

    const exercisesToDelete = currentExerciseIds.filter(
      (id) => !validUpdatedExerciseIds.includes(id)
    );

    await Promise.all(
      exercisesToDelete.map(async (id) => {
        await deleteExercise(id as Types.ObjectId);
      })
    );

    workout.exercises = validUpdatedExerciseIds.map(
      (id) => new Types.ObjectId(id)
    );
  }

  await workout.save();

  const populatedWorkout = await WorkoutModel.findOne({
    _id: workoutId,
    userId: userId,
  })
    .populate("exercises")
    .exec();

  return populatedWorkout;
};

export const deleteWorkout = async (
  workoutId: Types.ObjectId,
  userId: Types.ObjectId
) => {
  const workout = await WorkoutModel.findOne({
    _id: workoutId,
    userId: userId,
  })
    .populate("exercises")
    .exec();

  if (!workout) {
    throw createHttpError(404, "Workout Not Found");
  }

  if (workout.exercises && workout.exercises.length > 0) {
    await Promise.all(
      workout.exercises.map(async (exerciseId) => {
        await deleteExercise(exerciseId);
      })
    );
  }

  const deletedWorkout = await WorkoutModel.findOneAndDelete({
    _id: workoutId,
    userId: userId,
  });

  return deletedWorkout;
};
