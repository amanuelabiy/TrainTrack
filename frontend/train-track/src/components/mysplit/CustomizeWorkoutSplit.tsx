import { Separator } from "../ui/separator";
import AddExercises from "./AddExercises";
import ViewWeeklySplit from "./ViewWeeklySplit";

interface CustomizeWorkoutSplitProps {
  handlePageSwitch: (path: string) => void;
}

function CustomizeWorkoutSplit({
  handlePageSwitch,
}: CustomizeWorkoutSplitProps) {
  return (
    <main className="mt-14">
      <h1 className="text-4xl  capitalize tracking-wider font-extrabold">
        Customize Your Workout Split
      </h1>
      <p className="mt-4 text-wrap tracking-wide  text-sm font-normal leading-normal">
        Add exercises, sets, and repetitions, with included tools to customize
        and view your entire weekly workout routine.
      </p>
      <Separator className="mt-5" />
      <div className="flex flex-col sm:flex-row mt-[115px] gap-10 items-center justify-center w-full max-w-screen-lg mx-auto">
        <ViewWeeklySplit handlePageSwitch={handlePageSwitch} />
      </div>
    </main>
  );
}

export default CustomizeWorkoutSplit;
