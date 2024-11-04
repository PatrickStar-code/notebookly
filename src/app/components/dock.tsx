import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import Image from "next/image";
import { ILink } from "../Main/layout";

export function FloatingDockDemo({links}: {links: ILink[]}) {

  return (
    <div className="flex items-center justify-center h-[35rem] ">
      <FloatingDock items={links} />
    </div>
  );
}