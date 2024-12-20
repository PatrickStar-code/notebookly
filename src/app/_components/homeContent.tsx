"use client";

import React, { useState } from "react";
import { DialogNewNoteboock } from "../_components/dialogNewNotebook";
import { Plus } from "lucide-react";
import { ToastContainer } from "react-toastify";
import DrawnButton from "../_components/drawnButton";
import NotebookCard from "../_components/cardNotebook";
import Image from "next/image";
import { NotebookModel } from "@prisma/client";

export default function HomeContent({
  notebooks,
}: {
  notebooks: NotebookModel[];
}) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrando os cadernos com base no termo de busca
  const filteredNotebooks = notebooks.filter((notebook) =>
    notebook.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {/* Campo de busca */}
      <div className="mt-4 mb-6">
        <input
          type="text"
          placeholder="Buscar cadernos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 
             bg-white text-black placeholder-gray-400 border-gray-300
             dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-500 dark:border-gray-600"
        />
      </div>

      {/* Exibição de cadernos */}
      {filteredNotebooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 sm:mt-8 md:mt-10">
          {filteredNotebooks.map((notebook) => (
            <NotebookCard {...notebook} key={notebook.id} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center">
          <Image
            src="/empty.svg"
            alt="No notebooks"
            className="w-48 h-48 mb-4"
            width={96}
            height={96}
          />
          <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-black dark:text-gray-400">
            Nenhum caderno encontrado.
          </p>
          <p className="text-lg text-black dark:text-gray-400 mt-2 ">
            Que tal criar o seu primeiro caderno agora?
          </p>
          <div className="mt-6">
            <DialogNewNoteboock
              trigger={
                <DrawnButton
                  variant="primary"
                  className="flex items-center gap-2"
                >
                  Criar Caderno <Plus size={18} />
                </DrawnButton>
              }
            />
          </div>
        </div>
      )}
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
