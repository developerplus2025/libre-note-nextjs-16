import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://decent-over.vercel.app/api/auth",
});
