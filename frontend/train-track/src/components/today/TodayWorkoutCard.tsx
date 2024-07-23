import { WorkoutResponse } from "@/types/workoutTypes";
import { useLoaderData } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { LuDumbbell } from "react-icons/lu";

function TodayWorkoutCard() {
  const workoutsForTheDay = useLoaderData() as WorkoutResponse[];
  console.log(workoutsForTheDay);
  return (
    <div className="mt-10">
      <h1 className="text-[18px] font-bold tracking-tight mb-6 ml-[8px]">
        Workout Log
      </h1>
      {workoutsForTheDay.length > 0 ? (
        <div className="flex justify-start">
          <Carousel className="w-[90%] h-[70%]">
            <CarouselContent className="h-full">
              {workoutsForTheDay.map((workout) => (
                <CarouselItem key={workout._id}>
                  <div className="p-1">
                    <Card className="w-[90%] h-[90%] border">
                      <CardContent className="flex-items aspect-video items-center justify-center p-3 h-full">
                        {workout.exercises.map((exercise) => (
                          <div
                            className="grid grid-cols-2 gap-2 items-center"
                            key={exercise._id}
                          >
                            <LuDumbbell className="w-8 h-8" />
                            <div className="flex flex-col">
                              <p>{exercise.name}</p>
                              <p>
                                {exercise.sets} sets of {exercise.reps} reps
                              </p>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      ) : (
        <div>no workouts for today</div>
      )}
    </div>
  );
}

export default TodayWorkoutCard;
