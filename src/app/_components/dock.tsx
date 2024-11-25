import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";

import { ILink } from "../main/layout";

export function FloatingDockDemo({ links }: { links: ILink[] }) {
  return (
    <div className="flex items-center  justify-center h-[35rem] ">
      <FloatingDock items={links} />
    </div>
  );
}
