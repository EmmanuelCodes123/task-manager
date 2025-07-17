import { z } from "zod";

export const UserSchema = z.object({
  fullName: z.string(),
  userName: z.string(),
  email: z.string(),
  password: z.string(),
  image: z.string().optional(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;

export default function UserAuth() {
  return UserSchema;
}
