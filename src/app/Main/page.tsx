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
      <div className="flex flex-col items-center text-center md:text-left md:flex-row md:justify-between">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-8xl font-edu mb-4 md:mb-0">
          Bem vindo(a)!
        </h1>
        <DialogNewNoteboock
          trigger={
            <div>
              {/* Botão para telas grandes */}
              <DrawnButton
                variant="outline"
                className="hidden lg:flex fixed items-center gap-2 top-12 right-8 z-40"
              >
                Criar Caderno <Plus size={16} />
              </DrawnButton>
              {/* Botão para telas médias e menores */}
              <DrawnButton
                variant="outline"
                className="fixed flex lg:hidden items-center py-[0.5rem] px-[0.5rem] right-8 top-8 z-40 rounded-full"
              >
                <Plus size={16} />
              </DrawnButton>
            </div>
          }
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 sm:mt-8 md:mt-10">
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
