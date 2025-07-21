import { Check, Delete, Edit, Play, Square } from "lucide-react";
  import { cn } from "../lib/utils";
import type { TaskSchemaType } from "./auth/AuthTask";
import { useEffect, useState } from "react";
import { useUserContext } from "../hooks/useUserContext";
import AuthTask from "./auth/AuthTask";
import defaultTaskImg from "../assets/defualttaskimg.png";

interface TaskProps {
  task: TaskSchemaType;
}

export default function Task({ task }: TaskProps) {
  const { setTasks, tasks, handleSetClr, handleSetPriorityClr, handleViewTask } =
    useUserContext();
  const isCompleted = task.status === "Completed";

  const [createTask, setCreateTask] = useState<boolean>();
  const [showOptions, setShowOptions] = useState(false);
  const [statusIcon, setStatusIcon] = useState(<Play color="red" />);

  function handleDelete(id: number) {
    const newTask = tasks.filter((task) => task.id !== id);
    setTasks(newTask);
  }

  useEffect(() => {
      switch (task.status) {
        case "Not Started":
          setStatusIcon(<Play color="red" />);
          break;
        case "In Progress":
          setStatusIcon(<Square color="orange" />);
          break;
        case "Completed":
          setStatusIcon(<Check color="green" />);
          break;
      }
  }, [task])
    
  

  function handleStatus(id: number, status: string) {
    switch (status) {
      case "Not Started":
        setStatusIcon(<Play color="red" />);
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t.id === id ? { ...t, status: "In Progress" } : t
          )
        );
        break;
      case "In Progress":
        setStatusIcon(<Square color="orange" />);
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t.id === id ? { ...t, status: "Completed" } : t
          )
        );
        break;
      case "Completed":
        setStatusIcon(<Check color="green" />);
        break;
    }
  }

  return (
    <div
      className="flex mt-5 border-1 border-[#848485] rounded-xl min-h-33 p-1 max-w-100"
      key={task.id}
    >
      {createTask && <AuthTask taskId={task.id} />}
      <div className="w-4 flex jutify-center">
        <p className={cn("", handleSetClr?.(task.status))}>o</p>
      </div>

      <div
        className={cn(
          " relative flex flex-col",
          !isCompleted ? "lg:w-63 w-53" : "w-45"
        )}
        onClick={() => handleViewTask(task.id)}
      >
        <h2 className="font-bold text-xl">{task.title}</h2>
        <div
          className={cn("flex-wrap  flex mt-1", () =>
            isCompleted ? "w-62" : "w-58"
          )}
        >
          <h2 className="text-[#848485] text-sm break-words whitespace-normal lg:line-clamp-3 line-clamp-3 w-63">
            {task.taskInfo}
          </h2>
        </div>
        <div className="flex gap-4 absolute bottom-0">
          {isCompleted || (
            <h2 className="text-[#848485] text-[10px]">
              Priority:{" "}
              <span className={cn("", handleSetPriorityClr?.(task.priority))}>
                {task.priority}
              </span>
            </h2>
          )}
          <h2 className={` text-[10px]`}>
            Status:{" "}
            <span className={cn("", handleSetClr?.(task.status))}>
              {task.status}
            </span>
          </h2>
        </div>
      </div>
      <div className="pr-2 relative flex-1">
        <div className="flex justify-end">
          <p
            className="text-xs font-bold text-[#848485] cursor-pointer"
            onClick={() => setShowOptions?.((cur) => !cur)}
          >
            ooo
          </p>
        </div>
        {showOptions && (
          <div className="w-25 flex justify-center items-center space-x-2 p-1 shadow-md drop-shadow-md absolute right-0 top-5 bg-white">
            <button
              className="w-5 h-full cursor-pointer"
              onClick={() => setCreateTask(true)}
            >
              <Edit className="w-full h-full" />
            </button>
            <button
              className="w-5 h-full cursor-pointer"
              onClick={() => handleDelete(task.id)}
            >
              <Delete className="w-full h-full" />
            </button>
            <button
              className="w-5 h-full cursor-pointer"
              onClick={() => handleStatus(task.id, task.status)}
            >
              {statusIcon}
            </button>
          </div>
        )}
        <div className="w-full h-20 flex justify-center rounded">
          <img
            className="w-[80%] h-full"
            src={defaultTaskImg}
            alt="task image"
          />
        </div>
        <div className="absolute bottom-0 ">
          {isCompleted || (
            <p className="text-[10px]">Created on: {task.date}</p>
          )}
        </div>
      </div>
    </div>
  );
}
