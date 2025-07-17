import { useEffect, useState } from "react";
import type { UserSchemaType } from "../components/auth/UserAuth";
import { UserContext } from "./useUserContext";
import type { TaskSchemaType } from "../components/auth/AuthTask";

export default function UseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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
      }}
    >
      {children}
    </UserContext>
  );
}
