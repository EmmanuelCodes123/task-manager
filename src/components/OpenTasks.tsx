import { Clipboard } from "lucide-react";
import AuthTask from "./auth/AuthTask";
import Tasks from "./Tasks";
import { useUserContext } from "../hooks/useUserContext";

export default function OpenTasks() {
  const { createTask, setCreateTask } = useUserContext();
  const { tasks } = useUserContext();

  const openTasks = tasks.filter((task) => task.status !== "Completed");

  return (
    <div className="flex flex-col h-117 overflow-auto lg:shadow-2xl shadow-xl lg:w-115 w-full rounded p-4 pt-0 ">
      <div className="flex justify-between w-full sticky top-0 bg-white pt-4 z-100">
        <h2 className="text-red-400 flex">
          <Clipboard /> To-do
        </h2>
        <p className="cursor-pointer" onClick={() => setCreateTask(() => true)}>
          + Add Tasks
        </p>
      </div>
      {createTask ? <AuthTask taskId={undefined} /> : ""}

      {openTasks.map((task) => (
        <Tasks key={task.id} task={task} />
      ))}
    </div>
  );
}
