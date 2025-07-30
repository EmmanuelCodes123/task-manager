import type { UseFormReturn } from "react-hook-form";
import { TaskSchema, type TaskFormSchemaType } from "./auth/AuthTask";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

import { Button } from "./ui/button";

import { Textarea } from "./ui/textarea";
import { useUserContext } from "../hooks/useUserContext";

type NewFormProps = {
  form: UseFormReturn<TaskFormSchemaType>;
  taskId?: number;
};

export default function NewTask({ form, taskId }: NewFormProps) {
  const { setTasks, setCreateTask, tasks, createTask, setEditingTaskId } = useUserContext();

  function onSubmit(data: TaskFormSchemaType) {
    const parsedFormData = TaskSchema.safeParse(data);
    if (parsedFormData.success) {
      if (taskId === undefined) {
        setTasks((prev) => [...prev, parsedFormData.data]);
        console.log("success1");
      } else {
        const updatedTasks = tasks.map((t) =>
          t.id === taskId ? { ...t, ...parsedFormData.data } : t
        );
        setTasks(updatedTasks);
        console.log("success");
        setCreateTask(false);
        console.log(createTask);
      }
      setCreateTask(false);
    } else {
      console.log("not parsed", parsedFormData);
    }
  }
  return (
    <div className="w-full h-screen absolute right-0 left-0 top-0 bottom-0 z-200 flex items-center justify-center">
      <div className="hidden lg:block w-full h-full absolute bg-black opacity-50 z-50"></div>

      <div className="bg-white z-100 lg:w-170 w-full lg:h-145 mt-auto h-screen rounded-2xl lg:p-6 p-2">
        <header className="flex justify-between mb-4 lg:mt-0 mt-3">
          <h2 className="underline-offset-2 text-red-400">New Task</h2>
          <h2
            className="cursor-pointer"
            onClick={() => {
              setCreateTask(false);
              setEditingTaskId(undefined);
            }}
          >
            Go Back
          </h2>
        </header>
        <Form {...form}>
          <form
            className="lg:border-2 rounded border-gray-200 p-2 flex relative lg:h-125 h-160"
            onSubmit={form.handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          >
            <div className="space-y-5 w-100">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Input type="date" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem className="space-y-3 ">
                    <FormLabel>Priority</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex "
                      >
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem value="Extreme" />
                          </FormControl>
                          <FormLabel className="font-normal">Extreme</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem value="Moderate" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Moderate
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem value="Low" />
                          </FormControl>
                          <FormLabel className="font-normal">Low</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="taskInfo"
                render={({ field }) => (
                  <FormItem className="w-80 ">
                    <FormLabel>TaskInfo</FormLabel>
                    <FormControl>
                      <Textarea
                        className=" h-40 "
                        {...field}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.stopPropagation();
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                {taskId !== undefined ? "Update Task" : "Create Task"}
              </Button>
            </div>
            {/* <div className="flex-1 h-fit mt-auto mb-14 flex p-1 rounded-lg justify-end border-1 border-[#99a1af] flex-col  bottom-0 right-0 ml-1">
              <header>
                <h2 className="font-bold">Upload Image</h2>
              </header>
              <div className="inline-block w-25 h-25">
                <Image className="w-full h-full" />
              </div>
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormControl className="border-0">
                      <Input type="file" className="w-full " />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div> */}
          </form>
        </Form>
      </div>
    </div>
  );
}
