import { Clipboard } from "lucide-react";
import AuthTask from "./auth/AuthTask";
import Tasks from "./Tasks";
import { useUserContext } from "../hooks/useUserContext";
import noDataImg from "../assets/no data.jpg";
import { cn } from "../lib/utils";

export default function OpenTasks() {
  const { createTask, setCreateTask, handleViewTask } = useUserContext();
  const { tasks } = useUserContext();

  const openTasks = tasks.filter((task) => task.status !== "Completed");
  const minimized = openTasks.slice(0, 3);

  return (
    <div className="flex flex-col h-117 overflow-auto lg:shadow-2xl shadow-xl lg:w-115 w-full rounded lg:p-4 p-2 pt-0 ">
      <div className={cn("", createTask ? "lg:block hidden" : "block")}>
        <div className="flex justify-between w-full sticky top-0 bg-white pt-4 z-100">
          <h2 className="text-red-400 flex">
            <Clipboard /> To-do
          </h2>
          <p
            className="cursor-pointer"
            onClick={() => setCreateTask(() => true)}
          >
            + Add Tasks
          </p>
        </div>
        {minimized.length === 0 ? (
          <div className="w-70 h-70 lg:w-100 lg:h-100 lg:mt-10 mt-15 m-auto">
            <img className="w-full h-full" src={noDataImg} alt="no data" />
          </div>
        ) : (
          ""
        )}

        {minimized.map((task) => (
          <div key={task.id}>
            <Tasks task={task} />
          </div>
        ))}
        <div className="w-full flex justify-center mt-4 ">
          {minimized.length > 2 ? (
            <div className="w-full flex justify-center mt-4 ">
              <p
                className="text-red-400 cursor-pointer decoration-2 hover:underline-offset-2"
                onClick={() => handleViewTask()}
              >
                Show All
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {createTask ? <AuthTask taskId={undefined} /> : ""}
    </div>
  );
}
