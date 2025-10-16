import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: `${document.location.origin}`,
});

export const {
  useSession,
  signIn,
  signUp,
  signOut,
  forgetPassword,
  resetPassword,
} = authClient;

export type Session = typeof authClient.$Infer.Session;
export type User = typeof authClient.$Infer.Session.user;
