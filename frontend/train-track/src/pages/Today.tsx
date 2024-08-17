import TodayWorkoutCard from "@/components/today/TodayWorkoutCard";

function Today() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight ml-[8px] text-primary">
        Today's Workout
      </h1>
      <TodayWorkoutCard />
    </div>
  );
}

export default Today;
