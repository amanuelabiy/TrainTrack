import AddExercises from "./AddExercises";
import ViewWeeklySplit from "./ViewWeeklySplit";

function CustomizeWorkoutSplit() {
  return (
    <main className="mt-14">
      <h1 className="text-4xl  capitalize tracking-wider font-extrabold">
        Customize Your Workout Split
      </h1>
      <p className="mt-4 text-wrap tracking-wide  text-sm font-normal leading-normal">
        Add exercises, sets, and repetitions, with included tools to customize
        and view your entire weekly workout routine.
      </p>
      <div className="flex flex-col sm:flex-row mt-[115px] gap-10 items-center justify-center w-full max-w-screen-lg mx-auto">
        <AddExercises />
        <ViewWeeklySplit />
      </div>
    </main>
  );
}

export default CustomizeWorkoutSplit;
