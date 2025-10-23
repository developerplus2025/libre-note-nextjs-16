import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign In | Decent",
  description: "Decent - Sign In",
};
export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
