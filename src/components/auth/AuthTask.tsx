import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import NewTask from "../NewTasx";
import UseGeneratedId from "../../hooks/generateId";
import { useUserContext } from "../../hooks/useUserContext";
import { useEffect } from "react";


export const TaskSchema = z.object({
  title: z.string(),
  taskInfo: z.string(),
  priority: z.enum(
    localStorage.getItem("priority")
      ? JSON.parse(localStorage.getItem("priority")!)
      : ["Extreme", "Moderate", "Low"]
  ),
  date: z.string(),
  status: z.enum(
    localStorage.getItem("status")
      ? JSON.parse(localStorage.getItem("status")!)
      : ["Not Started", "In Progress", "Completed"]
  ),
  id: z.number(),
});

const TaskFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  taskInfo: z.string().min(1, "Task information is required"),
  priority: z.enum(
    localStorage.getItem("priority")
      ? JSON.parse(localStorage.getItem("priority")!)
      : ["Extreme", "Moderate", "Low"],
    {
      required_error: "A priority is needed",
    }
  ),
  date: z.string().min(1, "Date is required"),
  status: z.enum(
    localStorage.getItem("status")
      ? JSON.parse(localStorage.getItem("status")!)
      : ["Not Started", "In Progress", "Completed"]
  ),
  id: z.number(),
});

interface AuthFormProps {
  taskId: number | undefined;
}

export type TaskSchemaType = z.infer<typeof TaskSchema>;
export type TaskFormSchemaType = z.infer<typeof TaskFormSchema>;

export default function AuthTask({ taskId }: AuthFormProps) {
  const { tasks } = useUserContext();
  const task = tasks.find((t) => t.id === taskId);

  const form = useForm<TaskFormSchemaType>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      title: "",
      taskInfo: "",
      priority: "Extreme",
      status: "Not Started",
      date: "",
      id: UseGeneratedId(),
    },
  });

  useEffect(() => {
    if (task) {
      form.reset(task); 
    }
  }, [taskId, task, form]);

  return <NewTask form={form} taskId={taskId} />;
}
