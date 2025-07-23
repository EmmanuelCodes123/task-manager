import { z } from "zod";
import { BaseSchema } from "../components/auth/AuthForm";

export function getUpdateSchema(userData: { password?: string }) {
  return BaseSchema.omit({ confirmedTC: true })
    .extend({ oldPassword: z.string().min(6, "Old password is required") })
    .refine((data) => data.oldPassword === userData?.password, {
      message: "New Password doesnt match with previous password", path: ["oldPassword"],
    });
}

export type UpdateSchemaType = z.infer<ReturnType<typeof getUpdateSchema>>;
