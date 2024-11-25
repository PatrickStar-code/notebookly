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

const schema = z.object({
  title: z.string().min(1, { message: "O titulo deve ser informado." }),
  image: z.string(),
});

type FormData = z.infer<typeof schema>;

const defaultValues: FormData = {
  title: "",
  image: "",
};

export function DialogNewNoteboock({ trigger }: { trigger: React.ReactNode }) {
  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  function onSubmit(data: FormData) {
    console.log(data);
    CreateNewNotebook();
    reset();
  }
  return (
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
              <Input id="title" required {...register("title")} />
            </div>
            <div className="grid flex-1 gap-2">
              <Label htmlFor="img">Url Imagem</Label>
              <Input id="img" {...register("image")} />
            </div>
          </div>
          <DialogFooter className="flex mt-4 justify-start ">
            <Button type="submit" variant="default">
              Enviar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
