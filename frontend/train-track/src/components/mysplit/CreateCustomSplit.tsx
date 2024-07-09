import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

function CreateCustomSplit() {
  const navigate = useNavigate();

  const handleCreateSplit = () => {
    navigate("create-custom-split");
  };

  return (
    <div className="flex flex-col md:flex-row w-full border border-gray-300 rounded-lg p-6 mt-10">
      <div className="w-3/4 flex flex-col justify-center">
        <h1 className="font-semibold hidden md:block">
          Create your own workout split
        </h1>
        <p className="hidden custom:block custom:text-[#637588]">
          You can create your own workout split according to your preferences
        </p>
      </div>
      <div className="w-full md:w-1/4 flex justify-center md:justify-end items-center">
        <Button
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-300 w-full md:w-auto"
          onClick={handleCreateSplit}
        >
          Create Custom Split
        </Button>
      </div>
    </div>
  );
}

export default CreateCustomSplit;
