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

const url = "/workouts";

export const loader: LoaderFunction = async (): Promise<AllWorkoutReponse> => {
  const response = await customFetch.get(url);

  return response.data;
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
    console.log(workout);
  };

  const handleCancelClick = () => {
    setShowAddWorkoutCard(false);
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

  return (
    <div className="mt-3 grid grid-cols-1 relative md:grid-cols-2 lg:grid-cols-3">
      {workouts.map((workout, index) => (
        <div key={index}>
          <WorkoutCard
            workout={workout}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
        </div>
      ))}
      {showAddWorkoutCard && (
        <AddWorkoutCard
          onAddWorkout={onAddWorkout}
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
