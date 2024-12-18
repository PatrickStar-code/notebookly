"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

export default function NotesPage({ params }: { params: { id: string } }) {
  const [editorValue, setEditorValue] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleEditorChange = (value: string) => setEditorValue(value);

  const handleSave = () => console.log("Conteúdo salvo:", editorValue);

  const handleCancel = () => setEditorValue("");

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
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm border-2 border-gray-300 dark:border-gray-600">
            <label className="block text-gray-900 dark:text-gray-300 font-semibold">
              Conteúdo
            </label>
            {isClient && (
              <ReactQuill
                value={editorValue}
                onChange={handleEditorChange}
                theme="snow"
                className="w-full bg-transparent text-gray-900 dark:text-white p-2 rounded-md border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-700"
                aria-label="Editor de texto para adicionar conteúdo"
              />
            )}
          </div>

          <div className="flex space-x-4 justify-end mt-6">
            <Button
              onClick={handleSave}
              className="bg-indigo-500 text-white hover:bg-indigo-400 transition dark:bg-indigo-700 dark:hover:bg-indigo-600"
            >
              Salvar
            </Button>
            <Button
              onClick={handleCancel}
              className="bg-gray-600 text-white hover:bg-gray-500 transition dark:bg-gray-300 dark:text-gray-900 dark:hover:bg-gray-400"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
