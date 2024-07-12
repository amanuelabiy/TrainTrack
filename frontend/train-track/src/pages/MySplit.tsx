import { useSelector } from "react-redux";
import { RootState } from "@/store";
import CreateCustomSplit from "@/components/mysplit/CreateCustomSplit";
import SetWeeklySplit from "@/components/mysplit/SetWeeklySplit";
import WorkoutCard from "@/components/createcustomsplit/WorkoutCard";
import CustomizeWorkoutSplit from "@/components/mysplit/CustomizeWorkoutSplit";

function MySplit() {
  const workoutPlans = useSelector(
    (state: RootState) => state.workoutPlanState.workouts
  );

  const workouts = useSelector(
    (state: RootState) => state.workoutPlanState.workouts
  );

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide">My Workout Split</h1>
      {workoutPlans.length === 0 && (
        <>
          <CreateCustomSplit />
          <SetWeeklySplit />
          <CustomizeWorkoutSplit />
        </>
      )}
    </div>
  );
}

export default MySplit;
