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
import { toast } from "react-toastify";
import DrawnButton from "./drawnButton";

export default function DialogDeleteNotebook({
  trigger,
  CardProps,
}: {
  trigger: React.ReactNode;
  CardProps: NotebookModel;
}) {
  const [loading, setLoading] = useState(false);
  async function deleteNotebook(notebookId: string) {
    const isDark = document.documentElement.classList.contains("dark");
    try {
      setLoading(true);
      await DeleteNotebook(notebookId);
      toast.success("Deletado caderno com sucesso!", {
        theme: isDark ? "dark" : "light",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message, {
        theme: isDark ? "dark" : "light",
      });
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
        <DialogFooter className="md:flex flex-col mt-6 justify-center gap-2 w-full">
          <DialogClose asChild>
            <DrawnButton variant="cancel" className="w-full">
              <XCircle className="inline w-5 h-5 mr-1" />
              Cancelar
            </DrawnButton>
          </DialogClose>
          <DrawnButton
            onClick={() => deleteNotebook(CardProps.id)}
            variant="danger"
            className="w-full"
          >
            {loading ? (
              <span>Deletando...</span>
            ) : (
              <span>
                <Trash2 className="inline w-5 h-5 mr-1" />
                Deletar
              </span>
            )}
          </DrawnButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
