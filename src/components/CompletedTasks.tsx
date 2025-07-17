import { Clipboard } from "lucide-react";
import { useUserContext } from "../hooks/useUserContext";
import Tasks from "./Tasks";

export default function CompletedTasks() {
  const { tasks } = useUserContext();

  const completedTask = tasks.filter((task) => task.status === "Completed");

  return (
    <div className="mt-7 shadow-md rounded max-h-67 overflow-auto p-4 pt-3">
      <header className="flex gap-2 ">
        <Clipboard />
        <h2 className="text-red-400 font-bold">Completed Task</h2>
      </header>
      <div>
        {
          completedTask.map(task => (
            <Tasks task={task}/>
          ))
        }
      </div>
    </div>
  );
}
