import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    nickname: string({
      required_error: "nickname is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(4, "Password too short - should be 4 chars minimum."),
    passwordConfirmation: string({
      required_error: "Password confirmation is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Must be a valid email."),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
