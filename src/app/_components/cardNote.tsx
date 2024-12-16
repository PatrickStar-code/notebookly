import Image from "next/image";
import { Edit, Notebook, Search, Trash } from "lucide-react";
import { NoteModel } from "@prisma/client";
import UseformatDateToPortuguese from "../hooks/useFormateToPortuguese";
import { Badge } from "@/components/ui/badge";
import { emotionTranslations } from "../_constants/emotion";
import { Button } from "@/components/ui/button";
import { DialogEditNote } from "./dialogEditNote";
import DialogDeleteNote from "./dialogDeleteNote";
import Link from "next/link";

export default function NoteCard(props: NoteModel) {
  return (
    <div className="relative w-80 h-48 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group transition-transform transform hover:scale-105">
      {/* Imagem de fundo */}
      {props.image ? (
        <Image
          src={props.image}
          alt="Imagem da nota"
          fill
          className="object-cover object-center"
        />
      ) : (
        <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
          <Notebook size={40} className="text-gray-500 dark:text-gray-400" />
        </div>
      )}

      {/* Gradiente de sombreamento no título */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/95 via-black/50 to-black/30"></div>

      {/* Título */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between text-white text-lg font-bold truncate">
        <div>{props.title}</div>
        <div>{UseformatDateToPortuguese(props.createdAt)}</div>
      </div>

      {/* Emoticones */}
      <div className="absolute top-2 left-2 flex gap-2 ">
        <Badge variant="secondary">{emotionTranslations[props.Emotion]}</Badge>
      </div>

      {/* Ações (botões) */}
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Botão Ver */}

        <Link href={`/main/note/${props.id}`}>
          <Button
            className="bg-blue-500/90 hover:bg-blue-500/70 text-white p-2 rounded-full shadow-md"
            variant="ghost"
            size="icon"
          >
            <Search size={18} />
          </Button>
        </Link>

        {/* Botão Editar */}
        <DialogEditNote
          NoteBookId={props.id}
          NoteInfo={props}
          trigger={
            <Button
              className="bg-green-500/90 hover:bg-green-500/70 text-white p-2 rounded-full shadow-md"
              variant="ghost"
              size="icon"
            >
              <Edit size={18} />
            </Button>
          }
        />

        {/* Botão Excluir */}
        <DialogDeleteNote
          NoteProps={props}
          trigger={
            <Button
              className="bg-red-500/90 hover:bg-red-500/70 text-white p-2 rounded-full shadow-md"
              variant="ghost"
              size="icon"
            >
              <Trash size={18} />
            </Button>
          }
        />
      </div>
    </div>
  );
}
