import { Clipboard } from "lucide-react";
import { useUserContext } from "../hooks/useUserContext";
import Tasks from "./Tasks";
import noDataImg from "../assets/no data.jpg";
import { cn } from "../lib/utils";

export default function CompletedTasks() {
  const { tasks, createTask } = useUserContext();

  const completedTask = tasks.filter((task) => task.status === "Completed");
    const minimized = completedTask.slice(0, 3);


  return (
    <div className={cn("mt-7 shadow-md rounded max-h-67 overflow-auto p-4 pt-3 relative", createTask ? "lg:block hidden" : "block")}>
      <header className="flex gap-2 sticky top-0 z-100">
        <Clipboard />
        <h2 className="text-red-400 font-bold">Completed Task</h2>
      </header>
      {minimized.length === 0 ? (
        <div className="w-60 h-50 lg:w-50 lg:h-40 lg:mt-10 mt-15 m-auto">
          <img className="w-full h-full" src={noDataImg} alt="no data" />
        </div>
      ) : (
        ""
      )}
      <div>
        {minimized.map((task) => (
          <Tasks task={task} key={task.id}/>
        ))}
      </div>
      <div className="w-full flex justify-center mt-4 ">
        {minimized.length >= 3 ? (
          <p className="text-red-400 cursor-pointer decoration-2 hover:underline-offset-2">
            Show All
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
