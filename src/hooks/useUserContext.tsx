import React, { createContext, useContext } from "react";
import type { UserSchemaType } from "../components/auth/UserAuth";
import type { TaskSchemaType } from "../components/auth/AuthTask";

export interface UserContextType {
  userData: UserSchemaType | undefined;
  setUserData: React.Dispatch<React.SetStateAction<UserSchemaType>>;
  tasks: TaskSchemaType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskSchemaType[]>>;
  createTask: boolean;
  setCreateTask: React.Dispatch<React.SetStateAction<boolean>>
  handleSetPriorityClr: (priority: "Extreme" | "Moderate" | "Low") => string;
  handleSetClr: (status: "Not Started" | "In Progress" | "Completed") => string;
  handleViewTask: (id?: number) => void
}
export const UserContext = createContext<UserContextType | null>(null);

export function useUserContext() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a UserContext.Provider");
  }
  return userContext;
}
