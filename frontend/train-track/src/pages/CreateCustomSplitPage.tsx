import AddWorkoutBtn from "@/components/createcustomsplit/AddWorkoutBtn";

import AddWorkoutCard from "@/components/createcustomsplit/AddWorkoutCard";
import {
  type AllWorkoutReponse,
  Workout,
  WorkoutResponse,
} from "@/types/workoutTypes";
import { useState } from "react";
import { useAppDispatch } from "@/hooks";
import { addWorkout } from "@/features/workoutPlan/workoutPlanSlice";
import WorkoutCard from "@/components/createcustomsplit/WorkoutCard";
import { useLoaderData } from "react-router-dom";
import { customFetch } from "@/network/customFetch";
// import { updateWorkout } from "@/network/workout_api";
import * as WorkoutsApi from "@/network/workout_api";

export const loader: LoaderFunction = async (): Promise<AllWorkoutReponse> => {
  const response = await WorkoutsApi.fetchWorkouts();

  return response;
};

function CreateCustomSplitPage() {
  const [showAddWorkoutCard, setShowAddWorkoutCard] = useState(false);
  const dispatch = useAppDispatch();

  const workoutsData = useLoaderData() as WorkoutResponse[];
  const [workouts, setWorkouts] = useState(
    workoutsData.map((workout) => ({ ...workout, isEditing: false }))
  );

  console.log(workouts);

  const handleAddWorkoutClick = () => {
    setShowAddWorkoutCard(true);
  };

  const onAddWorkout = (workout: Workout) => {
    dispatch(addWorkout(workout));
    setShowAddWorkoutCard(false);
    WorkoutsApi.createWorkout(workout);
    console.log(workout);
  };

  const handleCancelClick = (cancelWorkout: WorkoutResponse | undefined) => {
    if (cancelWorkout) {
      setWorkouts((prevWorkouts) =>
        prevWorkouts.map((workout) =>
          workout._id === cancelWorkout._id
            ? { ...workout, ...cancelWorkout, isEditing: false }
            : workout
        )
      );
    }
  };

  const handleEditClick = (workout: WorkoutResponse) => {
    const { _id } = workout;
    setWorkouts((prevWorkouts) =>
      prevWorkouts.map((workout) =>
        workout._id === _id ? { ...workout, isEditing: true } : workout
      )
    );
  };

  const handleDeleteClick = () => {};

  const handleSaveWorkout = (updatedWorkout: WorkoutResponse) => {
    setWorkouts((prevWorkouts) =>
      prevWorkouts.map((workout) =>
        workout._id === updatedWorkout._id
          ? { ...workout, ...updatedWorkout, isEditing: false }
          : workout
      )
    );

    // console.log("Response Data: ", updateWorkout(updatedWorkout));
  };

  return (
    <div className="mt-3 grid grid-cols-1 relative md:grid-cols-2 lg:grid-cols-3">
      {workouts.map((workout) =>
        !workout.isEditing ? (
          <div key={workout._id}>
            <WorkoutCard
              workout={workout}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
            />
          </div>
        ) : (
          <div key={workout._id}>
            <AddWorkoutCard
              workout={workout}
              onAddWorkout={onAddWorkout}
              handleSaveWorkout={handleSaveWorkout}
              handleCancelClick={handleCancelClick}
            />
          </div>
        )
      )}

      {showAddWorkoutCard && (
        <AddWorkoutCard
          onAddWorkout={onAddWorkout}
          handleSaveWorkout={handleSaveWorkout}
          handleCancelClick={handleCancelClick}
        />
      )}
      <div className="fixed bottom-10 left-1/2 transform">
        <AddWorkoutBtn handleWorkoutClick={handleAddWorkoutClick} />
      </div>
    </div>
  );
}

export default CreateCustomSplitPage;
