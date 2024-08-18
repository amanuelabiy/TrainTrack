import magnifyingGlass from "@/assets/1194984416852389400magnifying_glass_01.svg.hi.png";

function NoWorkouts() {
  return (
    <div className="flex flex-col justify-center items-center h-[89vh]">
      <img src={magnifyingGlass} alt="No Results" className="w-1/3 mb-5"></img>
      <h1 className="text-[2rem] text-center">
        <span className="font-extrabold text-primary">404</span> No Workouts
        Found...
      </h1>
      <p>Try adding some!</p>
    </div>
  );
}

export default NoWorkouts;
