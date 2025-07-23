import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { useUserContext } from "../hooks/useUserContext";
import { useQueryState, parseAsInteger } from "nuqs";
import Task from "../components/Tasks";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../lib/utils";
import defaultTaskImg from "../assets/defualttaskimg.png";
import AuthTask from "../components/auth/AuthTask";

export default function ViewTasks() {
  const { tasks, createTask } = useUserContext();
  const activeTaskRef = useRef<HTMLDivElement | null>(null);

  const [currentTasks, setCurrentTasks] = useState(tasks);
  const [currentTaskId, setCurrentTaskId] = useQueryState(
    "id",
    parseAsInteger.withDefault(0)
  );

  const [isMobileView, setIsMobileView] = useState(
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );

  const [mobileView, setMobileView] = useState<"list" | "info">("list");

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobileView(mobile);
      if (!mobile) setMobileView("list");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentTask = useMemo(() => {
    return tasks.find((t) => t.id === currentTaskId);
  }, [tasks, currentTaskId]);

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

  useEffect(() => {
    if (
      currentTaskId === 0 &&
      tasks.length > 0 &&
      window.location.pathname.includes("/viewtask")
    ) {
      setCurrentTasks(tasks);
      setMobileView("list");
    }
  }, [tasks, currentTaskId]);

  useEffect(() => {
    if (activeTaskRef.current) {
      activeTaskRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex">
        <SideBar />
        <div className="border-2 rounded h-screen w-screen mt-2 lg:mt-10 lg:mx-4 p-5 border-gray-200 flex flex-1 space-x-2 relative">
          {(!isMobileView || mobileView === "list") && (
            <div className="w-100 h-full overflow-auto relative">
              <header className="sticky top-0 flex w-full justify-between items-center z-100">
                <h2
                  className="cursor-pointer hover:text-red-400"
                  onClick={() => {
                    setCurrentTasks(tasks);
                    setCurrentTaskId(0);
                    if (isMobileView) setMobileView("list");
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
                <div className="flex w-full px-5 justify-center items-center space-x-6 sticky top-7 z-100 bg-white h-7 rounded">
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
                <p className=" mt-5 font-bold">No Tasks</p>
              ) : (
                currentTasks.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      setCurrentTaskId(t.id);
                      if (isMobileView) setMobileView("info");
                    }}
                    className={cn(
                      "rounded-xl cursor-pointer",
                      t.id === currentTaskId ? "bg-[#e7eaf1] opacity-100" : ""
                    )}
                    ref={t.id === currentTaskId ? activeTaskRef : null}
                  >
                    <Task task={t} />
                    {createTask ? <AuthTask taskId={t.id} /> : null}
                  </div>
                ))
              )}
            </div>
          )}

          {/* Task Info */}
          {(!isMobileView || mobileView === "info") && (
            <div className="flex-1">
              {isMobileView && (
                <button
                  className="mb-2 underline underline-offset-3"
                  onClick={() => {
                    setMobileView("list");
                    setCurrentTaskId(0);
                  }}
                >
                  ← Back
                </button>
              )}
              {currentTask ? (
                <div>
                  <header className="border-b-2 border-gray-400 flex space-x-3 items-center pb-2">
                    <div className="w-30 h-30">
                      <img
                        className="w-full h-full"
                        src={defaultTaskImg}
                        alt="Task"
                      />
                    </div>
                    <div>
                      <h2>{currentTask.title}</h2>
                      <h2>Priority: {currentTask.priority}</h2>
                      <h2>Status: {currentTask.status}</h2>
                      <p>Created on: {currentTask.date}</p>
                    </div>
                  </header>
                  <div className="mt-2">{currentTask.taskInfo}</div>
                </div>
              ) : (
                <div className="text-gray-500">No task selected</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
