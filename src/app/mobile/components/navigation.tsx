import { Menu } from "./menu";
import UserButton from "./user-button";

export default function Navigation() {
  return (
    <div className="flex h-[50px] items-center justify-between">
      <div className="text-[1rem] font-bold">Listen Music</div>
      <div className="flex items-center gap-[1rem]">
        <Menu />
        <UserButton />
      </div>
    </div>
  );
}
