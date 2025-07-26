import { type UseFormReturn } from "react-hook-form";
import loginImg from "../assets/loginimg.jpg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import type { LoginSchemaType } from "./auth/AuthForm";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";

type LoginProps = {
  form: UseFormReturn<LoginSchemaType>;
};

export default function Login({ form }: LoginProps) {
  const navigate = useNavigate();
  const { setIsLoggedIn, isLoggedIn } = useUserContext();
 

  const onSubmit = (data: LoginSchemaType) => {
    const userData = localStorage.getItem("userData");

    if (userData) {
      const parsedUserData = JSON.parse(userData);
      if (
        parsedUserData.userName === data.userName &&
        parsedUserData.password === data.password
      ) {
        setIsLoggedIn(true);
        navigate("/");
      } else {
        console.error("Invalid username or password");
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  });

  return (
    <div className="flex m-auto mt-10 h-130 w-250 bg-gray-100 rounded gap-3">
      <div className="w-[50%] h-full">
        <img className="w-full h-full" src={loginImg} alt="login img" />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 p-3 overflow-auto no-scrollbar flex flex-col justify-center"
        >
          <header>
            <h1 className="font-bold text-2xl">Login</h1>
          </header>
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="User Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
          <div>
            <p className="text-10 cursor-pointer">
              Dont have an account?{" "}
              <span
                className="text-blue-500 underline"
                onClick={() => navigate("/signup")}
              >
                click here
              </span>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
