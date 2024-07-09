import { RequestHandler } from "express";
import createHttpError from "http-errors";
import * as workoutSplitService from "../services/workoutSplitService";
import { IWorkout } from "models/Workout";
import mongoose from "mongoose";

interface WorkoutSplitBody {
  name?: string;
  workouts?: IWorkout[];
}

export const createWorkoutSplit: RequestHandler<
  unknown,
  unknown,
  WorkoutSplitBody,
  unknown
> = async (req, res, next) => {
  const { name, workouts } = req.body;

  try {
    if (!name || !workouts) {
      throw createHttpError(400, "Missing Required Workout Split Fields");
    }

    const newWorkoutSplit = await workoutSplitService.createWorkoutSplit({
      name,
      workouts,
    });

    res.status(201).json(newWorkoutSplit);
  } catch (error) {
    next(error);
  }
};

interface UpdateWorkoutSplitParams {
  workoutSplitId: string;
}

interface UpdateWorkoutSplitBody {
  name?: string;
  workouts?: Partial<IWorkout>[];
}

// export const updateWorkoutSplit: RequestHandler<
//   UpdateWorkoutSplitParams,
//   unknown,
//   UpdateWorkoutSplitBody,
//   unknown
// > = async (req, res, next) => {
//   const workoutSplitId = req.params.workoutSplitId;

//   const newWorkoutSplitName = req.body.name;
//   const newWorkouts = req.body.workouts;

//   try {
//     if (!mongoose.isValidObjectId(workoutSplitId)) {
//       throw createHttpError(400, "Invalid Workout Id");
//     }

//     if (!newWorkoutSplitName && !newWorkouts) {
//       throw createHttpError(400, "No valid fiels to update");
//     }

//     const newUpdateData = {
//       workoutSplitId: new mongoose.Types.ObjectId(workoutSplitId),
//       newWorkoutSplitName: newWorkoutSplitName,
//       newWorkouts: newWorkouts,
//     };

//     const updatedWorkoutSplit = await workoutSplitService.updateWorkoutSplit(
//       newUpdateData
//     );

//     res.status(200).json(updatedWorkoutSplit);
//   } catch (error) {
//     next(error);
//   }
// };
