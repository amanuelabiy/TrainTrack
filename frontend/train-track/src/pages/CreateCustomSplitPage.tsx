import AddWorkoutBtn from "@/components/createcustomsplit/AddWorkoutBtn";

import AddWorkoutCard from "@/components/createcustomsplit/AddWorkoutCard";

function CreateCustomSplitPage() {
  return (
    <div className="flex flex-col h-full">
      <AddWorkoutCard />
      <div className="mt-auto mx-auto mb-10 ">
        <AddWorkoutBtn />
      </div>
    </div>
  );
}

export default CreateCustomSplitPage;
