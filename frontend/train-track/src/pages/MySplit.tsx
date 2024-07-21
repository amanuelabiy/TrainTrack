import CreateCustomSplit from "@/components/mysplit/CreateCustomSplit";
import SetWeeklySplit from "@/components/mysplit/SetWeeklySplit";
import CustomizeWorkoutSplit from "@/components/mysplit/CustomizeWorkoutSplit";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function MySplit() {
  const [editSplit, setEditSplit] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handlePageSwitch = (path: string) => {
    setEditSplit(true);
    navigate(path);
  };

  useEffect(() => {
    setEditSplit(false);
    const editSplitPath = ["/mysplit/create-custom-split"];

    if (editSplitPath.includes(location.pathname)) {
      setEditSplit(true);
    }
  }, [location]);

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide">My Workout Split</h1>

      {!editSplit ? (
        <>
          <CreateCustomSplit handlePageSwitch={handlePageSwitch} />
          <SetWeeklySplit />
          <CustomizeWorkoutSplit handlePageSwitch={handlePageSwitch} />
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
}

export default MySplit;
