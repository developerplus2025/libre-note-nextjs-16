"use client";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import { useQueryState } from "nuqs";
import { useEffect } from "react";
interface TypeRouter {
  name: String;
}
const DataRouter: TypeRouter[] = [
  {
    name: "signup",
  },
  {
    name: "signin",
  },
];
export function SettingsParams() {
  const { setTheme } = useTheme();
  const [name, setName] = useQueryState("theme");
  const router = useRouter();
  const [nameRouter, setNameRouter] = useQueryState("router");
  useEffect(() => {
    const found = DataRouter.find((item) => item.name === nameRouter);
    if (nameRouter != "" && found) {
      router.push(String(nameRouter));
    }
  });

  useEffect(() => {
    if ((name != "" && name == "light") || name == "dark") {
      return setTheme(String(name));
    }
  });
  return (
    <div className="hidden">
      <input value={name || ""} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => setName(null)}>Clear</button>
      <p>Hello, {name || "anonymous visitor"}!</p>
    </div>
  );
}
