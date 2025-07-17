import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SignUp from "../SignUp";
import Login from "../Login";

const FormShema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    userName: z.string().min(1, "User name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
    confirmedTC: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
    // image: z
    //   .instanceof(File)
    //   .refine((file) => file.type.startsWith("image/"), {
    //     message: "File must be an image",
    //   })
    //   .refine((file) => file.size <= 2 * 1024 * 1024, {
    //     message: "Image must be less than 2MB",
    //   })
    //   .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const LoginSchema = z.object({
  userName: z.string(),
  password: z.string(),
});

export type FormSchemaType = z.infer<typeof FormShema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;

export default function AuthForm({ type }: { type?: "signup" | "login" }) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormShema),
    defaultValues: {
      fullName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      confirmedTC: false,
    },
  });

  const loginForm = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  return (
    <>
      {type === "signup" ? <SignUp form={form} /> : <Login form={loginForm} />}
    </>
  );
}
