import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://libre-note-nextjs-16.vercel.app/api/auth",
});
