import { useSelector } from "react-redux";
import { RootState } from "@/store";
import CreateCustomSplit from "@/components/mysplit/CreateCustomSplit";
import SetWeeklySplit from "@/components/mysplit/SetWeeklySplit";

function MySplit() {
  const workoutPlans = useSelector(
    (state: RootState) => state.workoutPlanState.workoutPlans
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
    </div>
  );
}

export default MySplit;
