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
import { Trash2, XCircle } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
// import { toast } from "react-toastify";
import { toast } from "react-toastify";
import DrawnButton from "./drawnButton";
import { NoteModel } from "@prisma/client";
import DeleteNote from "../_actions/deleteNote";

export default function DialogDeleteNote({
  trigger,
  NoteProps,
}: {
  trigger: React.ReactNode;
  NoteProps: NoteModel;
}) {
  const [loading, setLoading] = useState(false);
  async function deleteNote(notebookId: string) {
    const isDark = document.documentElement.classList.contains("dark");
    try {
      setLoading(true);
      await DeleteNote(notebookId);
      toast.success("Deletado Nota com sucesso!", {
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
            <span className="font-bold">{NoteProps.title}</span>?
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
            onClick={() => deleteNote(NoteProps.id)}
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
