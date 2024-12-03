import { Notebook } from "lucide-react";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { NotebookModel } from "@prisma/client";
import Image from "next/image";

export default function NotepadCard(props: NotebookModel) {
  return (
    <div className="flex justify-center p-4">
      <Card className="w-full sm:w-96 bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-lg hover:scale-105">
        {/* Imagem ou Placeholder */}
        {props.image ? (
          <Image
            src={props.image}
            alt="Imagem do caderno"
            width={300}
            height={300}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center mb-4">
            <Notebook size={40} className="text-gray-400 dark:text-gray-500" />
          </div>
        )}

        {/* Cabeçalho com Ícone e Título */}
        <CardHeader className="flex items-center space-x-2 mb-2">
          <Notebook size={24} className="text-gray-700 dark:text-gray-300" />
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
            {props.title}
          </CardTitle>
        </CardHeader>

        {/* Informações de criação e edição */}
        <div className="flex justify-between text-xs text-gray-400 mt-4 dark:text-gray-300">
          <div>
            <div>Criado em:</div>
            <div>{props.createdAt.toDateString()}</div>
          </div>
          <div>
            <div>Editado em:</div>
            <div>{props.updatedAt.toDateString()}</div>
          </div>
        </div>

        {/* Botão Ver/Editar */}
        <CardFooter className="flex justify-center mt-6 space-x-2">
          <button className="text-sm text-center px-8 bg-blue-200 hover:bg-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 py-2 rounded-[0.4em] border-2 border-black dark:border-gray-700 font-extrabold text-black dark:text-white shadow-[0.1em_0.1em] transition-all duration-100 ease-in-out hover:shadow-[0.15em_0.15em] hover:translate-x-[-0.05em] hover:translate-y-[-0.05em] active:shadow-[0.05em_0.05em] active:translate-x-[0.05em] active:translate-y-[0.05em]">
            Ver
          </button>
          <button className="text-sm text-center px-8 bg-blue-200 hover:bg-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 py-2 rounded-[0.4em] border-2 border-black dark:border-gray-700 font-extrabold text-black dark:text-white shadow-[0.1em_0.1em] transition-all duration-100 ease-in-out hover:shadow-[0.15em_0.15em] hover:translate-x-[-0.05em] hover:translate-y-[-0.05em] active:shadow-[0.05em_0.05em] active:translate-x-[0.05em] active:translate-y-[0.05em]">
            Editar
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
