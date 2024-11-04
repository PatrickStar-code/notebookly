"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

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
        "fixed bottom-4 inset-x-0 mx-auto flex h-16 max-w-xs gap-4 items-center justify-center rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 md:hidden",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer key={item.title} {...item} />
      ))}
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
    <Link href={href}>
      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800">
        {icon}
      </div>
    </Link>
  );
}
