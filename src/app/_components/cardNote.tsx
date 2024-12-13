import Image from "next/image";
import Link from "next/link";
import { Notebook, Trash } from "lucide-react";
import { NoteModel } from "@prisma/client";
import UseformatDateToPortuguese from "../hooks/useFormateToPortuguese";

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
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      {/* Título */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between text-white text-lg font-bold truncate">
        <div>{props.title}</div>
        <div>{UseformatDateToPortuguese(props.createdAt)}</div>
      </div>

      {/* Ações (botões) */}
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Botão Ver */}
        <Link href={`main/notebook/${props.id}`}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-lg shadow">
            Ver
          </button>
        </Link>

        {/* Botão Editar */}
        <button className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-lg shadow">
          Editar
        </button>

        {/* Botão Excluir */}
        <button className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-lg shadow">
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
}
