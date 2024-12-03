"use client";

import { Button } from "@/components/ui/button";
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
import CreateNewNotebook from "../_actions/createNewNotebook";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

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

export type FormDataNewNotebook = z.infer<typeof schema>;

const defaultValues: FormDataNewNotebook = {
  title: "",
  image: "",
};

export function DialogNewNoteboock({ trigger }: { trigger: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataNewNotebook>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  async function onSubmit(data: FormDataNewNotebook) {
    const isDark = document.documentElement.classList.contains("dark");
    try {
      setLoading(true);

      await CreateNewNotebook(data);
      toast.success("Criado caderno com sucesso!", {
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
            <DialogTitle>Novo Caderno</DialogTitle>
            <DialogDescription>Criar um novo caderno.</DialogDescription>
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
                />
              </div>
              <div className="grid flex-1 gap-2">
                <Label htmlFor="img">Url Imagem</Label>
                <Input
                  className={"${errors.image ? 'border-red-500' : ''}"}
                  id="img"
                  {...register("image")}
                  placeholder="Digite a url"
                />
              </div>
            </div>
            <DialogFooter className="flex mt-4 justify-start ">
              {errors.image && <span>{errors.image.message}</span>}

              <Button type="submit" variant="default">
                {loading ? "Criando..." : "Criar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
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
