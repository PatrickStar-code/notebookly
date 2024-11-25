import React from "react";
import { Button } from "@/components/ui/button";

import NotepadCard from "../_components/card";
import db from "@/lib/db";
import { auth } from "@/auth";
import { DialogNewNoteboock } from "../_components/dialogNewNotebook";
import { Plus } from "lucide-react";

export default async function Home() {
  const session = await auth();

  const notebooks = await db.notebookModel.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  return (
    <>
      <div className="flex items-center   justify-between">
        <h1 className="md:text-8xl font-serif text-4xl text-center  font-edu">
          Bem vindo(a)!, {session?.user?.name}
        </h1>
        <DialogNewNoteboock
          trigger={
            <Button variant={"outline"}>
              Criar Caderno <Plus size={16} />
            </Button>
          }
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {notebooks.map((notebook) => (
          <NotepadCard {...notebook} key={notebook.id} />
        ))}
      </div>
    </>
  );
}
