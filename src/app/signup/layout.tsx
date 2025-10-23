import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign Up | Decent",
  description: "Decent - Sign Up",
};
export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
