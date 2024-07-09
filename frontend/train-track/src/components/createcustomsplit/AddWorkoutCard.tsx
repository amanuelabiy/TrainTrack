function AddWorkoutCard({ onAddWorkout }: { onAddWorkout: () => void }) {
  return (
    <div
      className="flex items-center justify-center w-32 h-32 bg-gray-200 rounded-lg cursor-pointer transform transition-transform duration-200 hover:scale-105"
      onClick={onAddWorkout}
    >
      <svg
        className="w-12 h-12 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 4v16m8-8H4"
        ></path>
      </svg>
    </div>
  );
}

export default AddWorkoutCard;
