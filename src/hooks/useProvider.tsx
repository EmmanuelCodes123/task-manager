import {useEffect, useState } from "react";
import type { UserSchemaType } from "../components/auth/UserAuth";
import { UserContext } from "./useUserContext";
import type { TaskSchemaType } from "../components/auth/AuthTask";
import { useNavigate } from "react-router-dom";

export default function UseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserSchemaType>(() => {
    const userInfo = localStorage.getItem("userData");
    return userInfo
      ? JSON.parse(userInfo)
      : { name: "", userName: "", email: "", password: "" };
  });
  const [tasks, setTasks] = useState<TaskSchemaType[]>(() => {
    const task = localStorage.getItem("tasks");
    return task ? JSON.parse(task) : [];
  });
  const [createTask, setCreateTask] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [status, setStatus] = useState(() => {
    const statusData = localStorage.getItem("status");
    return statusData
      ? JSON.parse(statusData)
      : ["Not Started", "In Progress", "Completed"];
  });
  
  const [priority, setPriority] = useState(() => {
    const priorityData = localStorage.getItem("priority");
    return priorityData
      ? JSON.parse(priorityData)
      : ["Extreme", "Moderate", "Low"];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("priority", JSON.stringify(priority));
    localStorage.setItem("status", JSON.stringify(status));
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [tasks, priority, status, userData]);

  function handleSetClr(status: "Not Started" | "In Progress" | "Completed") {
    switch (status) {
      case "Not Started":
        return "text-red-400";
      case "In Progress":
        return "text-blue-400";
      case "Completed":
        return "text-green-500";
    }
  }

  function handleSetPriorityClr(priority: "Extreme" | "Moderate" | "Low") {
    switch (priority) {
      case "Extreme":
        return "text-red-300";
      case "Low":
        return "text-green-300";
      case "Moderate":
        return "text-blue-300";
    }
  }

  function handleViewTask(id?: number) {
    navigate(`/viewtask?id=${id}`);
  }

  return (
    <UserContext
      value={{
        userData,
        setUserData,
        tasks,
        setTasks,
        createTask,
        setCreateTask,
        handleSetPriorityClr,
        handleSetClr,
        handleViewTask,
        openSideBar,
        setOpenSideBar,
        status,
        setStatus,
        priority,
        setPriority,
      }}
    >
      {children}
    </UserContext>
  );
}
