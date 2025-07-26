import { useState, type Dispatch, type RefObject, type SetStateAction } from "react";
import type { TaskSchemaType } from "./auth/AuthTask";
import Task from "./Tasks";
import AuthTask from "./auth/AuthTask";
import { cn } from "../lib/utils";

interface TaskListProps {
  tasks: TaskSchemaType[];
  currentTaskId: number;
  currentTasks: TaskSchemaType[];
  setCurrentTasks: Dispatch<SetStateAction<TaskSchemaType[]>>;
  onTaskClick: (id: number) => void;
  createTask: boolean;
  activeTaskRef: RefObject<HTMLDivElement | null>;
}

export default function TaskList({
  tasks,
  currentTaskId,
  currentTasks,
  setCurrentTasks,
  onTaskClick,
  createTask,
  activeTaskRef,
}: TaskListProps) {
  const priorities = ["Extreme", "Moderate", "Low"];
  const status = ["Not Started", "In Progress", "Completed"];
  const [category, setCategory] = useState<string[]>();
  const [openCategory, setOpenCategory] = useState(false);

  function handleSort(category: string) {
    setCurrentTasks(
      tasks.filter((t) => t.status === category || t.priority === category)
    );
    setOpenCategory(false);
  }

  return (
    <div className="w-100 h-full overflow-auto relative">
      <header className="sticky top-0 flex w-full justify-between items-center z-100 bg-white py-2">
        <h2
          className="cursor-pointer hover:text-red-400"
          onClick={() => {
            setCurrentTasks(tasks);
            onTaskClick(0);
          }}
        >
          My Tasks
        </h2>
        <p
          className="text-sm hover:text-red-400 cursor-pointer"
          onClick={() => {
            setCategory(status);
            setOpenCategory((c) => !c);
          }}
        >
          Sort By Status
        </p>
        <p
          className="text-sm hover:text-red-400 cursor-pointer"
          onClick={() => {
            setCategory(priorities);
            setOpenCategory((c) => !c);
          }}
        >
          Sort By Priority
        </p>
      </header>

      {openCategory && (
        <div className="flex w-full px-5 justify-center items-center space-x-6 sticky top-10 z-100 bg-white h-7 rounded">
          {category?.map((c) => (
            <p
              key={c}
              className="text-gray-700 hover:text-red-400 cursor-pointer"
              onClick={() => handleSort(c)}
            >
              {c}
            </p>
          ))}
        </div>
      )}

      {currentTasks.length === 0 ? (
        <p className="mt-5 font-bold">No Tasks</p>
      ) : (
        currentTasks.map((t) => (
          <div
            key={t.id}
            onClick={() => onTaskClick(t.id)}
            className={cn(
              "rounded-xl cursor-pointer",
              t.id === currentTaskId ? "bg-[#e7eaf1] opacity-100" : ""
            )}
            ref={t.id === currentTaskId ? activeTaskRef : null}
          >
            <Task task={t} />
            {createTask && <AuthTask taskId={t.id} />}
          </div>
        ))
      )}
    </div>
  );
}
