import createHttpError from "http-errors";
import { IWorkout } from "models/Workout";
import { createWorkout, updateWorkout } from "./workoutService";
import WorkoutSplitModel from "../models/WorkoutSplit";
import mongoose, { Types } from "mongoose";
import { IExercise } from "models/Exercise";
import ExerciseModel from "../models/Exercise";

interface CreateWorkoutSplitData {
  name: string;
  workouts: IWorkout[];
}

export const createWorkoutSplit = async (splitData: CreateWorkoutSplitData) => {
  const { name, workouts } = splitData;

  try {
    const workoutDocs = await Promise.all(
      workouts.map(async (workout: any) => {
        const newWorkout = await createWorkout(workout);

        if (newWorkout) {
          await newWorkout.save();

          return newWorkout._id;
        }
        return undefined;
      })
    );

    const validWorkoutDocs = workoutDocs.filter((id) => id !== undefined);

    const newWorkoutSplit = new WorkoutSplitModel({
      name,
      workouts: validWorkoutDocs,
    });

    await newWorkoutSplit.save();

    const populatedWorkoutSplit = await WorkoutSplitModel.findById(
      newWorkoutSplit._id
    )
      .populate("workouts")
      .exec();

    return populatedWorkoutSplit;
  } catch (error) {
    if (error instanceof createHttpError.HttpError) {
      throw error;
    }

    throw createHttpError(
      500,
      "An unexpected workoutSplit service error has occured"
    );
  }
};

interface UpdateWorkoutSplitData {
  workoutSplitId: Types.ObjectId;
  newWorkoutSplitName?: string;
  newWorkouts?: Partial<IWorkout>[];
}

export const updateWorkoutSplit = async (
  updateData: UpdateWorkoutSplitData
) => {
  const { workoutSplitId, newWorkoutSplitName, newWorkouts } = updateData;

  const workoutSplit = await WorkoutSplitModel.findById(workoutSplitId).exec();

  if (!workoutSplit) {
    throw createHttpError(404, "Workout Split Not Found");
  }

  if (newWorkoutSplitName) {
    workoutSplit.name = newWorkoutSplitName;
  }

  if (newWorkouts && Array.isArray(newWorkouts)) {
    const updatedWorkoutIds = await Promise.all(
      newWorkouts.map(async (workout) => {
        if (workout._id) {
          const { _id, workoutName, exercises, day, notes } = workout;

          const updateWorkoutData = {
            workoutId: _id,
            newWorkoutName: workoutName,
            newExercises: exercises
              ? ((await Promise.all(
                  exercises.map(async (exerciseId) => {
                    const exercise = await ExerciseModel.findById(
                      exerciseId
                    ).exec();

                    if (!exercise) {
                      throw createHttpError(404, "Exercise Not Found");
                    }
                    return exercise;
                  })
                )) as IExercise[])
              : undefined,
            newDay: day,
            newNotes: notes,
          };

          const updatedWorkout = await updateWorkout(updateWorkoutData);

          if (updatedWorkout) {
            return updatedWorkout._id;
          } else {
            const { workoutName, exercises, day, notes } = workout;

            if (
              !workoutName ||
              !exercises ||
              !day ||
              !Array.isArray(exercises)
            ) {
              throw createHttpError(400, "Missing or Invalid Workout Fields");
            }

            const fullExercises = await Promise.all(
              exercises.map(async (exerciseId) => {
                const exercise = await ExerciseModel.findById(
                  exerciseId
                ).exec();

                if (!exercise) {
                  throw createHttpError(404, "Exercise Not Found");
                }
                return exercise;
              })
            );

            const newWorkout = await createWorkout({
              workoutName,
              exercises: fullExercises,
              day,
              notes,
            });

            if (newWorkout) {
              return newWorkout._id;
            }
          }
          return null;
        }
      })
    );

    workoutSplit.workouts = updatedWorkoutIds.filter(
      (id) => id !== null
    ) as Types.ObjectId[];
  }

  const updatedWorkoutSplit = await workoutSplit.save();
  return updatedWorkoutSplit;
};
