import { FaDumbbell } from "react-icons/fa";

function AddExercises() {
  return (
    <div className="flex flex-col bg-secondary border-2 p-3 border-border rounded-xl w-[400px] h-[120px] hover:cursor-pointer">
      <FaDumbbell className="text-3xl font-bold" />
      <div className="mt-3">
        <h2 className="font-bold placeholder:">Add Exercises</h2>
        <p className="text-[#b0b6bd] text-sm font-normal leading-normal">
          Easily add invidual exercises. With the ability to edit sets,
          repetitions, and notes.
        </p>
      </div>
    </div>
  );
}

export default AddExercises;
