import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SignUp from "../SignUp";
import Login from "../Login";
import { useUserContext } from "../../hooks/useUserContext";
import UpdateForm from "../UpdateForm";
import { getUpdateSchema, type UpdateSchemaType } from "../../lib/schemaHelpers";

export const BaseSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  userName: z.string().min(1, "User name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string().min(6, "Confirm password is required"),
  confirmedTC: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

const FormShema = BaseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);

const LoginSchema = z.object({
  userName: z.string(),
  password: z.string(),
});

export type FormSchemaType = z.infer<typeof FormShema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;

export default function AuthForm({
  type,
}: {
  type?: "signup" | "login" | "update";
}) {
  const { userData } = useUserContext();

  const UpdateSchema = getUpdateSchema(userData || {});


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

  const updateForm = useForm<UpdateSchemaType>({
    resolver: zodResolver(UpdateSchema),
    defaultValues: {
      fullName: userData?.fullName || "",
      userName: userData?.userName || "",
      email: userData?.email || "",
      password: "",
      confirmPassword: "",
      oldPassword: "",
    },
  });

  return (
    <>
      {type === "signup" && <SignUp form={form} />}
      {type === "login" && <Login form={loginForm} />}
      {type === "update" && <UpdateForm form={updateForm} />}
    </>
  );
}
