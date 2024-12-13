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
import DrawnButton from "./drawnButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NoteEmotion } from "@prisma/client"; // Importando o enum NoteEmotion
import { emotionTranslations } from "../_constants/emotion";
import CreateNewNote from "../_actions/createNewNote";

const schema = z.object({
  title: z.string().min(1, { message: "O título deve ser informado." }),
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
  NoteEmotion: z.string().min(1, { message: "Selecione uma emoção." }), // Adicionando o campo de emoção
});

export type FormDataNewNote = z.infer<typeof schema>;

const defaultValues: FormDataNewNote = {
  title: "",
  image: "",
  NoteEmotion: NoteEmotion.NEUTRAL,
};

export function DialogNewNote({
  trigger,
  NoteBookId,
}: {
  trigger: React.ReactNode;
  NoteBookId: string;
}) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormDataNewNote>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const noteEmotion = watch("NoteEmotion"); // Observar o valor atual

  async function onSubmit(data: FormDataNewNote) {
    const isDark = document.documentElement.classList.contains("dark");
    try {
      setLoading(true);

      const NewData = { ...data, NotebookId: NoteBookId };
      console.log("NewData", NewData);
      console.log("NoteBookId", NoteBookId);
      await CreateNewNote(NewData);
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
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nova Nota</DialogTitle>
          <DialogDescription>Criar uma nova nota.</DialogDescription>
        </DialogHeader>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex-1 gap-2">
            <Label htmlFor="title">Título</Label>
            <Input
              className={`${errors.title ? "border-red-500" : ""}`}
              id="title"
              {...register("title")}
              placeholder="Digite o título da nota"
            />
            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}
          </div>

          <div className="flex-1 gap-2">
            <Label htmlFor="image">URL da Imagem</Label>
            <Input
              className={`${errors.image ? "border-red-500" : ""}`}
              id="image"
              {...register("image")}
              placeholder="Digite o URL da imagem"
            />
            {errors.image && (
              <span className="text-red-500">{errors.image.message}</span>
            )}
          </div>

          <div className="flex-1 gap-2">
            <Label htmlFor="NoteEmotion">Selecione a Emoção</Label>
            <Select
              value={noteEmotion}
              onValueChange={(value) => setValue("NoteEmotion", value)}
              aria-label="Selecione a emoção da nota"
            >
              <SelectTrigger>
                <SelectValue placeholder="Escolha a emoção" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(NoteEmotion).map((emotion) => (
                  <SelectItem key={emotion} value={emotion}>
                    {emotionTranslations[emotion]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.NoteEmotion && (
              <span className="text-red-500">{errors.NoteEmotion.message}</span>
            )}
          </div>

          <DialogFooter className="flex mt-4 justify-start ">
            <DrawnButton type="submit" variant="primary" className="p-2 px-4">
              {loading ? "Criando..." : "Criar"}
            </DrawnButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
