"use client";
import { usePathname } from "next/navigation";
import { useBreadcrumb } from "fumadocs-core/breadcrumb";
import type { PageTree } from "fumadocs-core/server";
import { Fragment, useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function DocsBreadcrumb({ tree }: { tree: PageTree.Root }) {
  const pathname = usePathname();
  const items = useBreadcrumb(pathname, tree);
 const path = pathname.split("/");
 const [part, setPart] = useState(() => (path.length === 3 ? 3 : 2));
 useEffect(() => {
   if (path.length === 2) {
     setPart(2);
   } else if (path.length === 3) {
     setPart(3);
   }
 }, [pathname, path.length]);
 if (items.length === 0) return null;

 return (
   <div className="text-fd-muted-foreground -mb-3 flex flex-row items-center gap-1 text-sm font-medium">
     <span className="truncate">Docs</span>{" "}
     <ChevronRight className="size-4 shrink-0 rtl:rotate-180" />
     {part == 3 && (
       <div>
         {items.map((item, i) => (
           <Fragment key={i}>
             {item.url ? (
               <Link
                 href={item.url}
                 className="hover:text-fd-accent-foreground truncate"
               >
                 {item.name}
               </Link>
             ) : (
               <span className={`hidden truncate`}>{item.name}</span>
             )}
           </Fragment>
         ))}
       </div>
     )}
     {part == 2 && (
       <div className="flex items-center gap-1">
         {items.map((item, i) => (
           <Fragment key={i}>
             {i !== 0 && (
               <ChevronRight className={`size-4 shrink-0 rtl:rotate-180`} />
             )}
             {item.url ? (
               <Link
                 href={item.url}
                 className="hover:text-fd-accent-foreground truncate"
               >
                 {item.name}
               </Link>
             ) : (
               <span className={`truncate`}>{item.name}</span>
             )}
           </Fragment>
         ))}
       </div>
     )}
   </div>
 );
}
