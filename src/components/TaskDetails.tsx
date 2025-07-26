import defaultTaskImg from "../assets/defualttaskimg.png";
import type { TaskSchemaType } from "./auth/AuthTask";

interface TaskDetailsProps {
  task: TaskSchemaType | undefined;
  onBack: () => void;
  isMobileView: boolean;
}

export default function TaskDetails({
  task,
  onBack,
  isMobileView,
}: TaskDetailsProps) {
  return (
    <div className="flex-1 overflow-hidden ml-3">
      {isMobileView && (
        <button className="mb-2 underline underline-offset-3" onClick={onBack}>
          ← Back
        </button>
      )}

      {task ? (
        <div className="flex flex-col h-full">
          <header className="border-b-2 border-gray-400 flex space-x-3 items-center pb-2">
            <div className="w-20 h-20">
              <img className="w-full h-full object-cover" src={defaultTaskImg} alt="Task" />
            </div>
            <div className="space-y-1">
              <h2 className="font-semibold text-lg">{task.title}</h2>
              <h2 className="text-sm">Priority: {task.priority}</h2>
              <h2 className="text-sm">Status: {task.status}</h2>
              <p className="text-xs text-gray-500">Created on: {task.date}</p>
            </div>
          </header>

          <div className="mt-2  text-sm overflow-auto break-words max-h-[calc(100vh-200px)]">
            {task.taskInfo}
          </div>
        </div>
      ) : (
        <div className="text-gray-500">No task selected</div>
      )}
    </div>
  );
}
