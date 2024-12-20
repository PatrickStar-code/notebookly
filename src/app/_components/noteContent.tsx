"use client";

import React, { useState } from "react";
import NoteCard from "@/app/_components/cardNote";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Notebook, Search } from "lucide-react";
import { ToastContainer } from "react-toastify";
import DrawnButton from "@/app/_components/drawnButton";
import { emotionTranslations } from "@/app/_constants/emotion";
import Image from "next/image";
import Link from "next/link";
import { NoteModel } from "@prisma/client";

export default function NoteContent({ data }: { data: NoteModel[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrando as notas com base no termo de busca
  const filteredNotes = data.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Contando os sentimentos para exibir no gráfico
  const emotionCounts = filteredNotes.reduce(
    (acc: Record<string, number>, note) => {
      acc[note.Emotion] = (acc[note.Emotion] || 0) + 1;
      return acc;
    },
    {}
  );

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-center font-edu">
          Todas Notas
        </h1>
      </div>

      {/* Campo de busca */}
      <div className="mt-4 mb-6 relative">
        <input
          type="text"
          placeholder="Buscar notas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 
             bg-white text-black placeholder-gray-400 border-gray-300
             dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-500 dark:border-gray-600"
        />
        {/* Ícone de busca */}
        <Search
          size={20}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
        />
      </div>

      {/* Seção de Sentimentos */}
      {filteredNotes.length > 0 && (
        <Card className="bg-gray-50 dark:bg-gray-900 shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Distribuição de Sentimentos
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4 justify-center">
            {Object.entries(emotionCounts).map(([emotion, count]) => (
              <div
                key={emotion}
                className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md space-y-2 w-36"
              >
                <span className="text-3xl">
                  {
                    emotionTranslations[
                      emotion as keyof typeof emotionTranslations
                    ].split(" ")[0]
                  }
                </span>
                <span
                  className={`capitalize text-lg font-medium text-center ${
                    count > 0
                      ? "text-gray-800 dark:text-gray-100"
                      : "text-gray-400"
                  }`}
                >
                  {emotionTranslations[
                    emotion as keyof typeof emotionTranslations
                  ]
                    .split(" ")
                    .slice(1)
                    .join(" ")}
                </span>
                <span
                  className={`inline-flex items-center justify-center px-3 py-1 text-sm font-medium rounded-full ${
                    count > 0
                      ? "bg-blue-500 text-white"
                      : "bg-gray-400 text-gray-200"
                  }`}
                >
                  {Math.round((count / filteredNotes.length) * 100)}%
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {count} nota{count !== 1 ? "s" : ""}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Seção de Notas */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0">
          {filteredNotes.map((note) => (
            <NoteCard {...note} key={note.id} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center">
          <Image
            src="/empty.svg"
            alt="No notebooks"
            className="w-48 h-48 mb-4"
            width={96}
            height={96}
          />
          <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-black dark:text-gray-400">
            Nenhuma nota encontrada.
          </p>
          <p className="text-lg text-black dark:text-gray-400 mt-2">
            Comece criando um caderno e crie uma nota para começar!
          </p>
          <div className="mt-6">
            <Link href="/Main/">
              <DrawnButton
                variant="primary"
                className="flex items-center gap-2"
              >
                Ir para os Cadernos <Notebook size={18} />
              </DrawnButton>
            </Link>
          </div>
        </div>
      )}

      {/* Toast para Notificações */}
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
    </div>
  );
}
