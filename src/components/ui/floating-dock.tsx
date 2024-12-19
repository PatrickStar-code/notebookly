"use client";

import logout from "@/app/_actions/logout";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

export const FloatingDock = ({
  items,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  mobileClassName?: string;
}) => {
  return <FloatingDockMobile items={items} className={mobileClassName} />;
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  return (
    <motion.div
      className={cn(
        "fixed bottom-4 inset-x-0 mx-auto flex h-16 max-w-xs gap-4 items-center justify-center rounded-2xl bg-gray-50 dark:bg-gray-900 px-4 md:hidden",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer key={item.title} {...item} />
      ))}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800"
              onClick={() => {
                logout();
              }}
            >
              <LogOutIcon size={16} />
            </div>
          </TooltipTrigger>
          <TooltipContent className="cursor-pointer bg-gray-200 text-black dark:bg-gray-700 dark:text-white">
            <p>Logout</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
};

function IconContainer({
  title,
  icon,
  href,
}: {
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={href}>
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800">
              {icon}
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent className="cursor-pointer bg-gray-200 text-black dark:bg-gray-700 dark:text-white">
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
