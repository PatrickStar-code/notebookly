"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import dynamic from "next/dynamic"; // Importação dinâmica para evitar problemas de SSR com Quill

// Carregar o Quill de forma dinâmica (para evitar problemas no SSR)
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Importar o tema "snow" do Quill
import "react-quill/dist/quill.bubble.css"; // Importar o tema "bubble" do Quill

export default function NotesPage({ params }: { params: { id: string } }) {
  const [editorValue, setEditorValue] = useState<string>("");

  const handleEditorChange = (value: string) => {
    setEditorValue(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center p-6 bg-white text-gray-900 dark:bg-gray-700 dark:text-white transition-colors"
    >
      <motion.div
        className="w-full max-w-4xl bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl border-4 border-gray-300 dark:border-gray-600"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-indigo-400 border-b-2 border-gray-300 dark:border-gray-600 pb-2">
            Notas de {params.id}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 italic">
            Aqui você pode adicionar suas anotações e muito mais...
          </p>
        </header>

        <div className="space-y-6">
          {/* Caixa de texto para o título */}

          {/* Área para o editor Quill */}
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm border-2 border-gray-300 dark:border-gray-600">
            <label className="block text-gray-900 dark:text-gray-300 font-semibold">
              Conteúdo
            </label>
            <ReactQuill
              value={editorValue}
              onChange={handleEditorChange}
              theme="bubble"
              className="w-full bg-transparent text-gray-900 dark:text-white p-2 rounded-md border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-700"
            />
          </div>

          {/* Botões de ação */}
          <div className="flex space-x-4 justify-end mt-6">
            <Button className="bg-indigo-500 text-white hover:bg-indigo-400 transition dark:bg-indigo-700 dark:hover:bg-indigo-600">
              Salvar
            </Button>
            <Button className="bg-gray-600 text-white hover:bg-gray-500 transition dark:bg-gray-300 dark:text-gray-900 dark:hover:bg-gray-400">
              Cancelar
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
