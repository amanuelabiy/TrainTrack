import { IoCalendarNumberOutline } from "react-icons/io5";

interface ViewWeeklySplitProps {
  handlePageSwitch: (path: string) => void;
}

function ViewWeeklySplit({ handlePageSwitch }: ViewWeeklySplitProps) {
  return (
    <div
      className="flex flex-col bg-secondary border-2 p-3 border-border rounded-xl w-[400px] h-[120px] hover:cursor-pointer"
      onClick={() => handlePageSwitch("create-custom-split")}
    >
      <IoCalendarNumberOutline className="text-2xl font-bold" />
      <div className="mt-3">
        <h2 className="font-bold placeholder:">View your Weekly Routine</h2>
        <p className="text-[#b0b6bd] text-sm font-normal leading-normal">
          Access your current weekly routine.
        </p>
      </div>
    </div>
  );
}

export default ViewWeeklySplit;
