import React from "react";

import db from "@/lib/db";
import { auth } from "@/auth";
import { DialogNewNoteboock } from "../_components/dialogNewNotebook";
import { Plus } from "lucide-react";
import { ToastContainer } from "react-toastify";
import DrawnButton from "../_components/drawnButton";
import NotebookCard from "../_components/cardNotebook";

export default async function Home() {
  const session = await auth();

  const notebooks = await db.notebookModel.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <div className="flex items-center  ">
        <h1 className="md:text-8xl font-serif text-4xl text-center  font-edu">
          Bem vindo(a)!
        </h1>
        <DialogNewNoteboock
          trigger={
            <DrawnButton
              variant="outline"
              className="fixed  flex  items-center  gap-2 right-8 z-40"
            >
              Criar Caderno <Plus size={16} />
            </DrawnButton>
          }
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {notebooks.map((notebook) => (
          <NotebookCard {...notebook} key={notebook.id} />
        ))}
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
