import type { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { getUpdateSchema, type UpdateSchemaType } from "../lib/schemaHelpers";
import { useUserContext } from "../hooks/useUserContext";
import { useEffect, useState } from "react";
import Success from "./Success";

export default function UpdateForm({
  form,
}: {
  form: UseFormReturn<UpdateSchemaType>;
}) {
  const { setUserData, userData } = useUserContext();
  const UpdateSchema = getUpdateSchema(userData || {});
  const [showSuccess, setShowSuccess] = useState(false);

  function onSubmit(data: UpdateSchemaType) {
    const parsedFormData = UpdateSchema.safeParse(data);
    if (parsedFormData.success) {
      setUserData((prev) => ({
        ...prev,
        fullName: data.fullName,
        userName: data.userName,
        email: data.email,
        password: data.password,
      }));
      setShowSuccess(true);
      console.log("Update successful", parsedFormData.data);
    } else {
      console.log("Update failed", parsedFormData.error);
    }
  }

  useEffect(() => {
  if (showSuccess) {
    const timer = setTimeout(() => setShowSuccess(false), 3000);
    return () => clearTimeout(timer);
  }
}, [showSuccess]);


  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border-2 rounded border-gray-400 p-4 space-y-4 flex flex-col flex-grow overflow-auto"
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>FullName</FormLabel>
                <FormControl>
                  <Input placeholder="Full Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UserName</FormLabel>
                <FormControl>
                  <Input placeholder="User Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Input Old Password</FormLabel>
                <FormControl>
                  <Input placeholder="Old Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="New Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm New Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Update</Button>
        </form>
        {showSuccess && <Success />}
      </Form>
    </>
  );
}
