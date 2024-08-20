import { type WorkoutHistoryLoaderReturn } from "@/utils/loaders";
import { useLoaderData } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";

function WorkoutMenu() {
  const { workouts } = useLoaderData() as WorkoutHistoryLoaderReturn;

  return <div></div>;
}

export default WorkoutMenu;
