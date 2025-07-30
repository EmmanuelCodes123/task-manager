import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { useUserContext } from "../hooks/useUserContext";
import { useQueryState, parseAsInteger } from "nuqs";
import { useEffect, useMemo, useRef, useState } from "react";
import TaskList from "../components/TaskList";
import TaskDetails from "../components/TaskDetails";

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

  const currentTask = useMemo(
    () => tasks.find((t) => t.id === currentTaskId),
    [tasks, currentTaskId]
  );

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
      activeTaskRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  useEffect(() => {
  setCurrentTasks(tasks);
  if (!tasks.find((t) => t.id === currentTaskId)) {
    setCurrentTaskId(0);
    if (isMobileView) setMobileView("list");
  }
}, [tasks, isMobileView, currentTaskId, setCurrentTaskId]);


  function handleTaskClick(id: number) {
    setCurrentTaskId(id);
    if (isMobileView) setMobileView("info");
  }

  function handleBack() {
    setMobileView("list");
    setCurrentTaskId(0);
  }

  return (
    <div>
      <Navbar setCurrentTasks={setCurrentTasks} />
      <div className="flex">
        <SideBar />
        <div className="border-2 rounded h-screen w-100 mt-2 lg:mt-10 lg:mx-4 p-2 lg:p-5 border-gray-200 flex flex-1 space-x-2 relative">
          {(!isMobileView || mobileView === "list") && (
            <TaskList
              tasks={tasks}
              currentTaskId={currentTaskId}
              currentTasks={currentTasks}
              setCurrentTasks={setCurrentTasks}
              onTaskClick={handleTaskClick}
              createTask={createTask}
              activeTaskRef={activeTaskRef}
            />
          )}

          {(!isMobileView || mobileView === "info") && (
            <TaskDetails
              task={currentTask}
              onBack={handleBack}
              isMobileView={isMobileView}
            />
          )}
        </div>
      </div>
    </div>
  );
}
