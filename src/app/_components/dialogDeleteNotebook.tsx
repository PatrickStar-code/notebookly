"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NotebookModel } from "@prisma/client";
import { Trash2, XCircle } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
// import { toast } from "react-toastify";
import DeleteNotebook from "../_actions/deleteNotebook";

export default function DialogDeleteNotebook({
  trigger,
  CardProps,
}: {
  trigger: React.ReactNode;
  CardProps: NotebookModel;
}) {
  const [loading, setLoading] = useState(false);
  async function deleteNotebook(notebookId: string) {
    try {
      setLoading(true);
      await DeleteNotebook(notebookId);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {/* Cabeçalho do Dialog */}
        <DialogHeader className="flex flex-col justify-center items-center">
          <Trash2 className="w-10 h-10 text-red-500" /> {/* Ícone de Lixeira */}
          <DialogTitle className="text-center">
            Deletar Caderno:{" "}
            <span className="font-bold">{CardProps.title}</span>?
          </DialogTitle>
        </DialogHeader>

        {/* Corpo do Dialog */}
        <div className="flex flex-col items-center justify-center mt-4">
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Tem certeza que deseja deletar este caderno? Esta ação não pode ser
            desfeita.
          </p>
        </div>

        {/* Rodapé com Botões */}
        <DialogFooter className="flex mt-6 justify-center space-x-4">
          <DialogClose asChild>
            <button
              onClick={() => console.log("Cancelado")}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white px-4 py-2 rounded font-semibold transition"
            >
              <XCircle className="inline w-5 h-5 mr-1" />
              Cancelar
            </button>
          </DialogClose>
          <button
            onClick={() => deleteNotebook(CardProps.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold transition"
          >
            {loading ? (
              <span>
                <Trash2 className="inline w-5 h-5 mr-1" />
                Deletando...
              </span>
            ) : (
              <span>
                <Trash2 className="inline w-5 h-5 mr-1" />
                Deletar
              </span>
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
