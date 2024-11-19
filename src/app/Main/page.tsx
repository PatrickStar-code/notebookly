import React from "react";
import { div, h1 } from "framer-motion/client";
import { Button } from "@/components/ui/button";
import { PencilIcon, PencilLine } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="flex items-center   justify-between">
        <h1 className="md:text-8xl font-serif text-4xl text-center  font-edu">
          Como esta se sentindo hoje?
        </h1>
        <Button variant={"outline"}>
          Cliar nova nota <PencilLine size={16} />
        </Button>
      </div>
    </>
  );
}
