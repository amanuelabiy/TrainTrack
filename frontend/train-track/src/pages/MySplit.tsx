import { useSelector } from "react-redux";
import { RootState } from "@/store";
import CreateCustomSplit from "@/components/mysplit/CreateCustomSplit";
import SetWeeklySplit from "@/components/mysplit/SetWeeklySplit";
import WorkoutCard from "@/components/createcustomsplit/WorkoutCard";

function MySplit() {
  const workoutPlans = useSelector(
    (state: RootState) => state.workoutPlanState.workouts
  );

  const workouts = useSelector(
    (state: RootState) => state.workoutPlanState.workouts
  );

  return (
    <div>
      <h1 className="text-3xl font-semibold">My Workout Split</h1>
      {workoutPlans.length === 0 && (
        <>
          <CreateCustomSplit />
          <SetWeeklySplit />
        </>
      )}
      {workouts.map((workout, index) => (
        <div key={index}>
          <WorkoutCard workout={workout} />
        </div>
      ))}
    </div>
  );
}

export default MySplit;
