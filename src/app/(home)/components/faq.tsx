// Dependencies: pnpm install lucide-react

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { Plus } from "lucide-react";
import Image from "next/image";
const branch = [
  {
    id: "1",
    src: "tailwindcss",
  },
  {
    id: "2",
    src: "framer",
  },
  {
    id: "3",
    src: "shadcnui",
  },
  {
    id: "4",
    src: "react",
  },
  {
    id: "5",
    src: "nextjs",
  },
  {
    id: "6",
    src: "swc",
  },
];
const items = [
  {
    id: "1",
    title: "What makes this software unique?",
    content:
      "This software stands out by combining a modern, developer-first design with a deep focus on accessibility and performance. Built entirely with TypeScript, it ensures better scalability and fewer bugs. Unlike traditional music tools, it offers a clean interface, seamless user experience, and strict adherence to accessibility standards. Whether you're a hobbyist or a pro, you'll appreciate the thoughtful design and maintainable architecture.",
  },
  {
    id: "2",
    title: "How can I customize the interface?",
    content:
      "You can easily customize the appearance of the app using built-in CSS variables, allowing you to adjust colors, spacing, fonts, and more. Developers can apply custom `className`s or inline styles for granular control. The interface supports both dark and light themes, which can be toggled manually or automatically based on system preferences. Tailoring the UI to match your brand or personal style is simple and flexible.",
  },
  {
    id: "3",
    title: "Is the software optimized for performance?",
    content:
      "Yes. The software uses tree-shaking, code-splitting, and lazy loading to reduce initial load time and improve runtime performance. React memoization helps avoid unnecessary re-renders, keeping everything smooth even when managing large libraries. With optimized rendering, efficient DOM updates, and a tiny footprint, it runs efficiently on both high-end and low-resource devices. You’ll get a fast and fluid experience across the board.",
  },
  {
    id: "4",
    title: "Is the software accessible?",
    content:
      "Absolutely. Every component includes proper ARIA labels, keyboard navigation, and clear focus management to meet WCAG guidelines. We've tested compatibility with major screen readers like NVDA and VoiceOver to ensure usability for everyone. The design maintains strong color contrast and respects reduced-motion settings. Accessibility isn't an afterthought—it's built into the foundation from day one.",
  },
  {
    id: "5",
    title: "What platforms are supported?",
    content:
      "The software is available as a cross-platform desktop app for Windows and macOS. There's also a browser-based version compatible with modern browsers like Chrome, Firefox, Safari, and Edge. It’s fully responsive, offering a smooth experience on tablets and mobile devices. Whether you’re at a desk or on the move, the app adapts to your workflow with zero compromise.",
  },
  {
    id: "6",
    title: "Is dark mode supported?",
    content:
      "Yes. Dark mode is supported out of the box and can either follow your system preferences or be toggled manually from the settings. All UI components adapt automatically with balanced contrast and accessibility in mind. You can also adjust the theme with custom variables to match your own visual preferences or branding guidelines.",
  },
  {
    id: "7",
    title: "How do I import music?",
    content:
      "You can import music by dragging and dropping files, choosing folders, or pasting URLs. The app also integrates with cloud platforms like Google Drive and Dropbox, allowing quick access to your music library. Once imported, files are scanned, tagged, and categorized automatically. Playlist tools and batch editing make managing your collection fast and efficient.",
  },
  {
    id: "8",
    title: "Does it require an internet connection?",
    content:
      "No. You can use all core features like playback, editing, and file management without an internet connection. However, certain features—such as cloud sync, software updates, or remote track fetching—require online access. The app is built to work reliably offline, ensuring productivity wherever you are.",
  },
];

export default function AccordionFAQ() {
  return (
    <div className="flex w-full justify-center px-12">
      <div className="flex flex-col-reverse items-center gap-4 rounded-lg min-[300px]:w-[calc(100vw-78px)] xl:w-[800px]">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          {items.map((items) => (
            <AccordionItem key={items.id} value={`item-${items.id}`}>
              <AccordionTrigger>{items.title}</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>{items.content}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="flex h-full w-[700px] flex-col items-center justify-center gap-8">
          <h1 className="text-center text-[2rem] leading-18 font-bold tracking-tighter text-white sm:text-[2rem] xl:text-[2rem]">
            Frequently asked questions
          </h1>
        </div>
      </div>
    </div>
  );
}
