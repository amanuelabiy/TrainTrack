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
// import { updateWorkout } from "@/network/workout_api";
import * as WorkoutsApi from "@/network/workout_api";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

export const loader: LoaderFunction = async (): Promise<AllWorkoutReponse> => {
  const response = await WorkoutsApi.fetchWorkouts();

  return response;
};

function CreateCustomSplitPage() {
  const [showAddWorkoutCard, setShowAddWorkoutCard] = useState(false);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const workoutsData = useLoaderData() as WorkoutResponse[];
  const [workouts, setWorkouts] = useState(
    workoutsData.map((workout) => ({ ...workout, isEditing: false }))
  );

  console.log(workouts);

  const handleAddWorkoutClick = () => {
    setShowAddWorkoutCard(true);
  };

  const onAddWorkout = async (newWorkout: Workout) => {
    if (!newWorkout.workoutName) {
      toast({
        variant: "destructive",
        title: "Workout Needs Name!",
      });
    }
    try {
      const response = await WorkoutsApi.createWorkout(newWorkout);
      dispatch(addWorkout(response));
      setWorkouts((prevWorkouts) => [
        ...prevWorkouts,
        { ...response, isEditing: false },
      ]);
      toast({
        variant: "success",
        title: "Added Workout",
      });
      setShowAddWorkoutCard(false);
    } catch (error) {
      toast({ variant: "destructive", title: "Error adding workout" });
      console.error("Error adding workout", error);
    }
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

  const handleNoWorkoutCancel = () => {
    setShowAddWorkoutCard(false);
  };

  const handleEditClick = async (workout: WorkoutResponse) => {
    const { _id } = workout;
    setWorkouts((prevWorkouts) =>
      prevWorkouts.map((workout) =>
        workout._id === _id ? { ...workout, isEditing: true } : workout
      )
    );
  };

  const handleDeleteClick = async (workoutForDeletion: WorkoutResponse) => {
    try {
      const response = await WorkoutsApi.deleteWorkout(workoutForDeletion);
      setWorkouts((prevWorkouts) =>
        prevWorkouts.filter((workout) => workout._id !== workoutForDeletion._id)
      );
      toast({
        variant: "delete",
        title: "Deleted Workout",
      });
    } catch (error) {
      console.error("Error deleting workout", error);
      toast({ variant: "destructive", title: "Error deleting workout" });
    }
  };

  const handleSaveWorkout = async (updatedWorkout: WorkoutResponse) => {
    try {
      const response = await WorkoutsApi.updateWorkout(updatedWorkout);
      setWorkouts((prevWorkouts) =>
        prevWorkouts.map((workout) =>
          workout._id === updatedWorkout._id
            ? { ...workout, ...updatedWorkout, isEditing: false }
            : workout
        )
      );
      toast({
        variant: "success",
        title: "Saved Workout",
      });
    } catch (error) {
      console.error("Error updating workout", error);
    }
  };

  const handleWorkoutFieldError = (error: string) => {
    toast({
      variant: "destructive",
      title: `${error}`,
    });
  };

  return (
    <div className="mt-3 grid grid-cols-1 relative md:grid-cols-2 lg:grid-cols-3 gap-[2rem]">
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
              handleNoWorkoutCancel={handleNoWorkoutCancel}
              handleWorkoutFieldError={handleWorkoutFieldError}
            />
          </div>
        )
      )}

      {showAddWorkoutCard && (
        <AddWorkoutCard
          onAddWorkout={onAddWorkout}
          handleSaveWorkout={handleSaveWorkout}
          handleCancelClick={handleCancelClick}
          handleNoWorkoutCancel={handleNoWorkoutCancel}
          handleWorkoutFieldError={handleWorkoutFieldError}
        />
      )}
      <Toaster />
      <div className="fixed bottom-10 left-1/2 transform">
        <AddWorkoutBtn handleWorkoutClick={handleAddWorkoutClick} />
      </div>
    </div>
  );
}

export default CreateCustomSplitPage;
