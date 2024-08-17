import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { LuDumbbell } from "react-icons/lu";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { calcWorkoutCompletion } from "@/utils/calcWorkoutCompletion";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { RootState } from "@/store";
import { startTodaysWorkout } from "@/features/todaysWorkout/todaysWorkoutSlice";
import RestartWorkoutBtn from "./RestartWorkoutBtn";

function WorkoutsCarousel() {
  const dispatch = useAppDispatch();
  const todaysWorkouts = useAppSelector(
    (state: RootState) => state.todaysWorkoutState.workoutsForToday
  );

  return (
    <div className="flex justify-start">
      <Carousel className="w-[90%] h-[70%]">
        <CarouselContent className="h-full">
          {todaysWorkouts ? (
            todaysWorkouts.map((workout) => (
              <CarouselItem className="flex flex-col" key={workout._id}>
                <Card className="w-[90%] h-[600px] border-none flex flex-col justify-between bg-transparent">
                  <CardContent className="flex-items aspect-video items-center justify-center p-3 overflow-hidden">
                    {workout.exercises.map((exercise, index) => (
                      <div
                        className={`flex items-center gap-10 ${
                          index === 0 ? "" : "mt-5"
                        }`}
                        key={exercise._id}
                      >
                        <LuDumbbell className="w-8 h-8" />
                        <div className="flex flex-col">
                          <p className="font-bold">{exercise.name}</p>
                          <p className="text-sm">
                            {exercise.sets} sets of {exercise.reps} reps
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <div className="flex flex-col items-center my-[60px]">
                    <label className="font-bold mr-auto mb-3">
                      {calcWorkoutCompletion(workout)}% Completed
                    </label>
                    <Progress
                      value={calcWorkoutCompletion(workout)}
                      className="w-full h-[5px]"
                    />
                  </div>
                  <div className="text-center mb-10">
                    {calcWorkoutCompletion(workout) === 100 ? (
                      <RestartWorkoutBtn workout={workout} />
                    ) : (
                      <Button
                        className="align-center w-56"
                        onClick={() => dispatch(startTodaysWorkout(workout))}
                      >
                        {calcWorkoutCompletion(workout) === 0
                          ? "Start Workout"
                          : "Continue Workout"}
                      </Button>
                    )}
                  </div>
                </Card>
              </CarouselItem>
            ))
          ) : (
            <div>Error</div>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default WorkoutsCarousel;
