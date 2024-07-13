import AddWorkoutBtn from "@/components/createcustomsplit/AddWorkoutBtn";

import AddWorkoutCard from "@/components/createcustomsplit/AddWorkoutCard";
import {
  type AllWorkoutReponse,
  Workout,
  WorkoutResponse,
} from "@/types/workoutTypes";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { addWorkout } from "@/features/workoutPlan/workoutPlanSlice";
import { RootState } from "@/store";
import WorkoutCard from "@/components/createcustomsplit/WorkoutCard";
import { useLoaderData } from "react-router-dom";

function CreateCustomSplitPage() {
  const [showAddWorkoutCard, setShowAddWorkoutCard] = useState(false);
  const dispatch = useAppDispatch();

  const workouts = useLoaderData() as WorkoutResponse[];

  // const workouts = useAppSelector(
  //   (state: RootState) => state.workoutPlanState.workouts
  // );

  const handleAddWorkoutClick = () => {
    setShowAddWorkoutCard(true);
  };

  const onAddWorkout = (workout: Workout) => {
    dispatch(addWorkout(workout));
    setShowAddWorkoutCard(false);
    console.log(workouts);
  };

  const handleCancelClick = () => {
    setShowAddWorkoutCard(false);
  };

  const handleEditClick = () => {};

  const handleDeleteClick = () => {};

  return (
    <div className="flex flex-col h-full relative">
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
