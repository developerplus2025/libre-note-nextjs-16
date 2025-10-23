// "use client";
// import * as React from "react";
// import {
//   Calculator,
//   Calendar,
//   CreditCard,
//   Settings,
//   Smile,
//   User,
//   Search,
//   RocketIcon,
//   StickyNote,
//   Sun,
//   Moon,
//   Monitor,
// } from "lucide-react";
// import {
//   Command,
//   CommandDialog,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
//   CommandSeparator,
//   CommandShortcut,
// } from "@/components/ui/command";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { useTheme } from "next-themes";
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
// import { useRouter } from "next/navigation";
// import {
//   MoonIcon,
//   SunIcon,
//   FileTextIcon,
//   LaptopIcon,
//   CalendarIcon,
//   EnvelopeClosedIcon,
//   FaceIcon,
//   GearIcon,
//   MagnifyingGlassIcon,
//   PersonIcon,
// } from "@radix-ui/react-icons";
// import { useCommandState } from "cmdk";
// export function CommandMenu() {
//   const router = useRouter();
//   const { setTheme } = useTheme();
//   const [open, setOpen] = React.useState(false);
//   const SubItem = (
//     props: React.JSX.IntrinsicAttributes &
//       Omit<
//         { children?: React.ReactNode } & Omit<
//           Pick<
//             Pick<
//               React.DetailedHTMLProps<
//                 React.HTMLAttributes<HTMLDivElement>,
//                 HTMLDivElement
//               >,
//               "key" | keyof React.HTMLAttributes<HTMLDivElement>
//             > & { ref?: React.Ref<HTMLDivElement> } & { asChild?: boolean },
//             "key" | keyof React.HTMLAttributes<HTMLDivElement> | "asChild"
//           >,
//           "onSelect" | "disabled" | "value"
//         > & {
//             disabled?: boolean;
//             onSelect?: (value: string) => void;
//             value?: string;
//             keywords?: string[];
//             forceMount?: boolean;
//           } & React.RefAttributes<HTMLDivElement>,
//         "ref"
//       > &
//       React.RefAttributes<HTMLDivElement>,
//   ) => {
//     const search = useCommandState((state) => state.search);
//     if (!search) return null;
//     return <CommandItem {...props} />;
//   };

//   React.useEffect(() => {
//     const down = (e: KeyboardEvent) => {
//       if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
//         e.preventDefault();
//         setOpen((open) => !open);
//       }
//     };

//     document.addEventListener("keydown", down);
//     return () => document.removeEventListener("keydown", down);
//   }, []);
//   const docsTitle = [
//     {
//       id: "1",
//       name: "Home",
//       src: "/",
//       shortcut: "⇧⌘H",
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="16"
//           height="16"
//           fill="#ffffff"
//           viewBox="0 0 256 256"
//         >
//           <path d="M224,120v96a8,8,0,0,1-8,8H160a8,8,0,0,1-8-8V164a4,4,0,0,0-4-4H108a4,4,0,0,0-4,4v52a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V120a16,16,0,0,1,4.69-11.31l80-80a16,16,0,0,1,22.62,0l80,80A16,16,0,0,1,224,120Z"></path>
//         </svg>
//       ),
//     },
//     {
//       id: "2",
//       name: "Browse",
//       src: "browse",
//       shortcut: "⇧⌘B",
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="16"
//           height="16"
//           fill="#ffffff"
//           viewBox="0 0 256 256"
//         >
//           <path d="M216,56v60a4,4,0,0,1-4,4H136V44a4,4,0,0,1,4-4h60A16,16,0,0,1,216,56ZM116,40H56A16,16,0,0,0,40,56v60a4,4,0,0,0,4,4h76V44A4,4,0,0,0,116,40Zm96,96H136v76a4,4,0,0,0,4,4h60a16,16,0,0,0,16-16V140A4,4,0,0,0,212,136ZM40,140v60a16,16,0,0,0,16,16h60a4,4,0,0,0,4-4V136H44A4,4,0,0,0,40,140Z"></path>
//         </svg>
//       ),
//     },
//     {
//       id: "3",
//       name: "Pricing",
//       src: "pricing",
//       shortcut: "⌘P",
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="16"
//           height="16"
//           fill="#ffffff"
//           viewBox="0 0 256 256"
//         >
//           <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm12,152h-4v8a8,8,0,0,1-16,0v-8H104a8,8,0,0,1,0-16h36a12,12,0,0,0,0-24H116a28,28,0,0,1,0-56h4V72a8,8,0,0,1,16,0v8h16a8,8,0,0,1,0,16H116a12,12,0,0,0,0,24h24a28,28,0,0,1,0,56Z"></path>
//         </svg>
//       ),
//     },
//     {
//       id: "4",
//       name: "Docs",
//       src: "docs",
//       shortcut: "⌘D",
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="16"
//           height="16"
//           fill="#ffffff"
//           viewBox="0 0 256 256"
//         >
//           <path d="M240,56V200a8,8,0,0,1-8,8H160a24,24,0,0,0-24,23.94,7.9,7.9,0,0,1-5.12,7.55A8,8,0,0,1,120,232a24,24,0,0,0-24-24H24a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H88a32,32,0,0,1,32,32v87.73a8.17,8.17,0,0,0,7.47,8.25,8,8,0,0,0,8.53-8V80a32,32,0,0,1,32-32h64A8,8,0,0,1,240,56Z"></path>
//         </svg>
//       ),
//     },
//     {
//       id: "5",
//       name: "Radio",
//       src: "radio",
//       shortcut: "⇧⌘R",
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="16"
//           height="16"
//           fill="#ffffff"
//           viewBox="0 0 256 256"
//         >
//           <path d="M216,64H86.51L194.3,31.67a8,8,0,0,0-4.6-15.33l-160,48h0A8,8,0,0,0,24,72V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64ZM104,176H64a8,8,0,0,1,0-16h40a8,8,0,0,1,0,16Zm0-32H64a8,8,0,0,1,0-16h40a8,8,0,0,1,0,16Zm0-32H64a8,8,0,0,1,0-16h40a8,8,0,0,1,0,16Zm64,56a32,32,0,1,1,32-32A32,32,0,0,1,168,168Z"></path>
//         </svg>
//       ),
//     },
//     {
//       id: "6",
//       name: "Community",
//       src: "community",
//       shortcut: "⌘C",
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="16"
//           height="16"
//           fill="#ffffff"
//           viewBox="0 0 256 256"
//         >
//           <path d="M164.47,195.63a8,8,0,0,1-6.7,12.37H10.23a8,8,0,0,1-6.7-12.37,95.83,95.83,0,0,1,47.22-37.71,60,60,0,1,1,66.5,0A95.83,95.83,0,0,1,164.47,195.63Zm87.91-.15a95.87,95.87,0,0,0-47.13-37.56A60,60,0,0,0,144.7,54.59a4,4,0,0,0-1.33,6A75.83,75.83,0,0,1,147,150.53a4,4,0,0,0,1.07,5.53,112.32,112.32,0,0,1,29.85,30.83,23.92,23.92,0,0,1,3.65,16.47,4,4,0,0,0,3.95,4.64h60.3a8,8,0,0,0,7.73-5.93A8.22,8.22,0,0,0,252.38,195.48Z"></path>
//         </svg>
//       ),
//     },
//     {
//       id: "7",
//       name: "Support",
//       src: "support",
//       shortcut: "⇧⌘S",
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="16"
//           height="16"
//           fill="#ffffff"
//           viewBox="0 0 256 256"
//         >
//           <path d="M232,96a72,72,0,0,1-100.94,66L79,222.22c-.12.14-.26.29-.39.42a32,32,0,0,1-45.26-45.26c.14-.13.28-.27.43-.39L94,124.94a72.07,72.07,0,0,1,83.54-98.78,8,8,0,0,1,3.93,13.19L144,80l5.66,26.35L176,112l40.65-37.52a8,8,0,0,1,13.19,3.93A72.6,72.6,0,0,1,232,96Z"></path>
//         </svg>
//       ),
//     },
//     {
//       id: "8",
//       name: "Download",
//       src: "downloads",
//       shortcut: "⇧⌘D",
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="16"
//           height="16"
//           fill="#ffffff"
//           viewBox="0 0 256 256"
//         >
//           <path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40A8,8,0,0,0,168,96H136V32a8,8,0,0,0-16,0V96H88a8,8,0,0,0-5.66,13.66Z"></path>
//         </svg>
//       ),
//     },
//     {
//       id: "9",
//       name: "Try On Web",
//       src: "webapp",
//       shortcut: "⌘T",
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="16"
//           height="16"
//           fill="#ffffff"
//           viewBox="0 0 256 256"
//         >
//           <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.62,87.62,0,0,1-6.4,32.94l-44.7-27.49a15.92,15.92,0,0,0-6.24-2.23l-22.82-3.08a16.11,16.11,0,0,0-16,7.86h-8.72l-3.8-7.86a15.91,15.91,0,0,0-11-8.67l-8-1.73L96.14,104h16.71a16.06,16.06,0,0,0,7.73-2l12.25-6.76a16.62,16.62,0,0,0,3-2.14l26.91-24.34A15.93,15.93,0,0,0,166,49.1l-.36-.65A88.11,88.11,0,0,1,216,128ZM40,128a87.53,87.53,0,0,1,8.54-37.8l11.34,30.27a16,16,0,0,0,11.62,10l21.43,4.61L96.74,143a16.09,16.09,0,0,0,14.4,9h1.48l-7.23,16.23a16,16,0,0,0,2.86,17.37l.14.14L128,205.94l-1.94,10A88.11,88.11,0,0,1,40,128Z"></path>
//         </svg>
//       ),
//     },
//     {
//       id: "10",
//       name: "AI Chat Box",
//       src: "ai",
//       shortcut: "⇧⌘A",
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="16"
//           height="16"
//           fill="#ffffff"
//           viewBox="0 0 256 256"
//         >
//           <path d="M208,144a15.78,15.78,0,0,1-10.42,14.94L146,178l-19,51.62a15.92,15.92,0,0,1-29.88,0L78,178l-51.62-19a15.92,15.92,0,0,1,0-29.88L78,110l19-51.62a15.92,15.92,0,0,1,29.88,0L146,110l51.62,19A15.78,15.78,0,0,1,208,144ZM152,48h16V64a8,8,0,0,0,16,0V48h16a8,8,0,0,0,0-16H184V16a8,8,0,0,0-16,0V32H152a8,8,0,0,0,0,16Zm88,32h-8V72a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0V96h8a8,8,0,0,0,0-16Z"></path>
//         </svg>
//       ),
//     },
//   ];
//   return (
//     <>
//       <div
//         onClick={() => setOpen((open) => !open)}
//         className="group flex h-[30px] w-[220px] cursor-pointer items-center justify-center rounded-md border transition-all duration-200 ease-out hover:bg-muted dark:hover:bg-[#101010]"
//       >
//         <div className="flex h-full items-center justify-center transition-all duration-200 ease-out dark:text-[#ffffff] dark:group-hover:text-white">
//           <div className="flex h-full items-center gap-3">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="16"
//               height="16"
//               fill="#ffffff"
//               viewBox="0 0 256 256"
//             >
//               <path d="M168,112a56,56,0,1,1-56-56A56,56,0,0,1,168,112Zm61.66,117.66a8,8,0,0,1-11.32,0l-50.06-50.07a88,88,0,1,1,11.32-11.31l50.06,50.06A8,8,0,0,1,229.66,229.66ZM112,184a72,72,0,1,0-72-72A72.08,72.08,0,0,0,112,184Z"></path>
//             </svg>

//             <p className="text-xs">Search for documention</p>
//             <div className="flex items-center gap-1">
//               <div className="flex items-center gap-1 rounded-md border px-1">
//                 <svg
//                   data-testid="geist-icon"
//                   height={12}
//                   strokeLinejoin="round"
//                   viewBox="0 0 16 16"
//                   width={12}
//                   style={{ color: "currentcolor" }}
//                 >
//                   <path
//                     fillRule="evenodd"
//                     clipRule="evenodd"
//                     d="M1 3.75C1 2.23122 2.23122 1 3.75 1C5.26878 1 6.5 2.23122 6.5 3.75V5H9.5V3.75C9.5 2.23122 10.7312 1 12.25 1C13.7688 1 15 2.23122 15 3.75C15 5.26878 13.7688 6.5 12.25 6.5H11V9.5H12.25C13.7688 9.5 15 10.7312 15 12.25C15 13.7688 13.7688 15 12.25 15C10.7312 15 9.5 13.7688 9.5 12.25V11H6.5V12.25C6.5 13.7688 5.26878 15 3.75 15C2.23122 15 1 13.7688 1 12.25C1 10.7312 2.23122 9.5 3.75 9.5H5V6.5H3.75C2.23122 6.5 1 5.26878 1 3.75ZM11 5H12.25C12.9404 5 13.5 4.44036 13.5 3.75C13.5 3.05964 12.9404 2.5 12.25 2.5C11.5596 2.5 11 3.05964 11 3.75V5ZM9.5 6.5H6.5V9.5H9.5V6.5ZM11 12.25V11H12.25C12.9404 11 13.5 11.5596 13.5 12.25C13.5 12.9404 12.9404 13.5 12.25 13.5C11.5596 13.5 11 12.9404 11 12.25ZM5 11H3.75C3.05964 11 2.5 11.5596 2.5 12.25C2.5 12.9404 3.05964 13.5 3.75 13.5C4.44036 13.5 5 12.9404 5 12.25V11ZM5 3.75V5H3.75C3.05964 5 2.5 4.44036 2.5 3.75C2.5 3.05964 3.05964 2.5 3.75 2.5C4.44036 2.5 5 3.05964 5 3.75Z"
//                     fill="currentColor"
//                   />
//                 </svg>
//                 <p className="text-xs">K</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* <p className="select-none text-sm text-[#7c7c7c] transition-colors duration-300 ease-out dark:group-hover:text-white">
//           Search documetion...
//         </p> */}
//         {/* <p className="text-sm text-muted-foreground">
//           <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
//             <span className="text-xs">⌘</span>K
//           </kbd>
//         </p> */}
//       </div>
//       <CommandDialog open={open} onOpenChange={setOpen}>
//         <CommandInput placeholder="Type a command or search..." />
//         <CommandList className="custom_command_scroll h-[500px]">
//           <CommandEmpty>No results found.</CommandEmpty>
//           <CommandGroup heading="Link">
//             {docsTitle.map((items_cm) => (
//               <CommandItem
//                 className="[&_svg]:mr-2 [&_svg]:shrink-0"
//                 key={items_cm.id}
//                 onSelect={() => {
//                   router.push(`${items_cm.src}`);
//                   setOpen((open) => !open);
//                 }}
//               >
//                 {items_cm.icon}

//                 <span className="text-sm">{items_cm.name}</span>
//                 <CommandShortcut>{items_cm.shortcut}</CommandShortcut>
//               </CommandItem>
//             ))}
//           </CommandGroup>
//           <CommandSeparator />
//           <CommandGroup heading="Theme">
//             <CommandItem
//               onSelect={() => {
//                 setTheme("light");
//                 setOpen((open) => !open);
//               }}
//             >
//               <SunIcon className="mr-2" />
//               <span>Light</span>
//             </CommandItem>
//             <CommandItem
//               onSelect={() => {
//                 setTheme("dark");
//                 setOpen((open) => !open);
//               }}
//             >
//               <MoonIcon className="mr-2" />
//               <span>Dark</span>
//             </CommandItem>
//             <CommandItem
//               onSelect={() => {
//                 setTheme("system");
//                 setOpen((open) => !open);
//               }}
//             >
//               <LaptopIcon className="mr-2" />
//               <span>System</span>
//             </CommandItem>
//           </CommandGroup>
//         </CommandList>
//       </CommandDialog>
//     </>
//   );
// }
