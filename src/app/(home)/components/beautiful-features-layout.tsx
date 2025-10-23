import {
  Cpu,
  Fingerprint,
  Pencil,
  Settings2,
  Sparkles,
  Zap,
} from "lucide-react";
import { title } from "process";
import { description } from "./chart";
const items = [
  {
    id: 1,
    title: "Smooth",
    description:
      " Optimized performance for seamless music editing and playback.",
    icons: Zap,
  },
  {
    id: 2,
    title: "Powerful",
    description: " Advanced audio processing tools for every creative need.",
    icons: Cpu,
  },
  {
    id: 3,
    title: "Secure",
    description:
      "Protects your data and music rights with cutting-edge security.",
    icons: Fingerprint,
  },
  {
    id: 4,
    title: "Customizable",
    description: " Personalize the interface and features to match your style.",
    icons: Pencil,
  },
  {
    id: 5,
    title: "Full Control",
    description: "Gives you complete control over your music projects.",
    icons: Settings2,
  },
  {
    id: 6,
    title: "AI-Powered",
    description:
      " Enhances your workflow with AI-driven music creation and production.",
    icons: Sparkles,
  },
];
export default function BeautifulFeaturesLayout() {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto space-y-8 px-6 md:space-y-16">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="w-[750px] text-center text-[3.5rem] leading-18 font-bold tracking-tighter text-white sm:text-5xl xl:text-[3.5rem]">
            The foundation for professional music creation
          </h1>
          <span className="md:text-md max-w-[450px] text-center text-zinc-500 dark:text-[#a1a1a1]">
            Our software is more than just a tool. It`s an ecosystem that
            supports everything from APIs to platforms, helping developers and
            artists innovate effortlessly.
          </span>
        </div>

        <div className="relative mx-auto grid max-w-[1000px] justify-center justify-items-center gap-[2rem] bg-[#000000] *:p-[1rem] sm:grid-cols-2 lg:grid-cols-3">
          {items.map((items) => (
            <div
              key={items.id}
              className={`border-input relative flex h-[200px] w-[300px] flex-col items-center justify-center gap-4 border`}
            >
              <div className="absolute top-0 left-0">
                <div className="absolute -top-[10px] -left-[10px] h-[10px] w-[20px] border-b border-white"></div>
                <div className="absolute -top-[10px] -left-[10px] h-[20px] w-[10px] border-r border-white"></div>
              </div>
              <div className="absolute bottom-0 left-0">
                <div className="absolute -top-[10px] -left-[10px] h-[10px] w-[20px] border-b border-white"></div>
                <div className="absolute -top-[10px] -left-[10px] h-[20px] w-[10px] border-r border-white"></div>
              </div>
              <div className="absolute top-0 right-0">
                <div className="absolute -top-[10px] -left-[10px] h-[10px] w-[20px] border-b border-white"></div>
                <div className="absolute -top-[10px] -left-[10px] h-[20px] w-[10px] border-r border-white"></div>
              </div>
              <div className="absolute right-0 bottom-0">
                <div className="absolute -top-[10px] -left-[10px] h-[10px] w-[20px] border-b border-white"></div>
                <div className="absolute -top-[10px] -left-[10px] h-[20px] w-[10px] border-r border-white"></div>
              </div>

              <div className="flex items-center gap-2">
                <items.icons className="size-4 shrink-0" />
                <h3 className="text-center text-sm font-medium">
                  {items.title}
                </h3>
              </div>
              <p className="text-center text-sm text-balance">
                {items.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
