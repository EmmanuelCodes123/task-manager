import type { UseFormReturn } from "react-hook-form";
import type { FormSchemaType } from "./auth/AuthForm";
import signupimg from "../assets/signupimg.jpg";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { useEffect, useState } from "react";
import { UserSchema, type UserSchemaType } from "./auth/UserAuth";
import { useNavigate } from "react-router-dom";

type SignUpProps = {
  form: UseFormReturn<FormSchemaType>;
};

export default function SignUp({ form }: SignUpProps) {
  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserSchemaType>(() => {
    const storedData = localStorage.getItem("userData");
    return storedData
      ? JSON.parse(storedData)
      : { userName: "", email: "", password: "", fullName: "" };
  });

  // set the user data and save to local storage if user data is not in local storage
  const onSubmit = (data: FormSchemaType) => {
    const parsedUserData = UserSchema.safeParse(data);
    if (parsedUserData.success) {
      setUserData(() => parsedUserData.data);
      navigate("/login");
    }
  };

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  return (
    <div className="flex m-auto mt-10 h-130 w-250 bg-gray-100 rounded gap-3">
      <div className="w-[50%] h-full">
        <img className="w-full h-full" src={signupimg} alt="Signup Img" />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 p-3 overflow-auto no-scrollbar"
        >
          <header>
            <h1 className="font-bold text-2xl">Sign Up</h1>
          </header>
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
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
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmedTC"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormLabel>I agree to all terms</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Sign Up</Button>
          <div>
            <p className="text-10 cursor-pointer">
              Already have an account?{" "}
              <span className="text-blue-500 underline" onClick={() => navigate("/login")}>click here</span>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
