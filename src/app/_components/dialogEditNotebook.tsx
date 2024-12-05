"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { NotebookModel } from "@prisma/client";
import EditNotebook from "../_actions/editNotebook";
import DrawnButton from "./drawnButton";

const schema = z.object({
  title: z.string().min(1, { message: "O titulo deve ser informado." }),
  image: z
    .string()
    .optional()
    .refine(
      (url) => url === undefined || url === "" || /(http|https):\/\//.test(url),
      {
        message:
          "A URL precisa começar com http ou https, ou pode ser deixada em branco.",
      }
    ),
});

export type FormDataEdit = z.infer<typeof schema>;

export function DialogEditNoteboock({
  trigger,
  NotebookId,
  CardInfo,
}: {
  trigger: React.ReactNode;
  NotebookId: string;
  CardInfo: NotebookModel;
}) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataEdit>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormDataEdit) {
    const isDark = document.documentElement.classList.contains("dark");
    try {
      setLoading(true);

      const newData = { ...data, NotebookId };

      await EditNotebook(newData);
      toast.success("Editado caderno com sucesso!", {
        theme: isDark ? "dark" : "light",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message, {
        theme: isDark ? "dark" : "light",
      });
    } finally {
      setLoading(false);
      reset();
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Caderno</DialogTitle>
            <DialogDescription>Editar o caderno.</DialogDescription>
          </DialogHeader>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="title">Titulo </Label>
                <Input
                  id="title"
                  required
                  {...register("title")}
                  placeholder="Digite o titulo"
                  defaultValue={CardInfo?.title}
                />
              </div>
              <div className="grid flex-1 gap-2">
                <Label htmlFor="img">Url Imagem</Label>
                <Input
                  className={"${errors.image ? 'border-red-500' : ''}"}
                  id="img"
                  {...register("image")}
                  placeholder="Digite a url"
                  defaultValue={CardInfo?.image}
                />
              </div>
            </div>
            <DialogFooter className="flex mt-4 justify-start ">
              {errors.image && <span>{errors.image.message}</span>}

              <DrawnButton type="submit" variant="primary">
                {loading ? "Editando..." : "Editar"}
              </DrawnButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
