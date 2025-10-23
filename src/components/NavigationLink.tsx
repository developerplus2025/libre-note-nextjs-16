'use client';

import clsx from 'clsx';
import Link from "next/link";
import {useSelectedLayoutSegment} from 'next/navigation';
import {ComponentProps} from 'react';


export default function NavigationLink({
  href,
  ...rest
}: ComponentProps<typeof Link>) {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';
  const isActive = pathname === href;

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={clsx(
        "relative flex cursor-pointer items-center transition-colors duration-300 ease-out select-none dark:text-[#a1a1a1] dark:hover:text-white",
        isActive
          ? "dark:text-white"
          : "dark:text-[#a1a1a1] dark:hover:text-white",
      )}
      href={href}
      {...rest}
    />
  );
}