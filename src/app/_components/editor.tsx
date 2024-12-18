"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { NoteModel } from "@prisma/client";
import DrawnButton from "./drawnButton";
import saveContentNote from "../_actions/saveContentNote";
import { toast } from "react-toastify";
export default function Editor(note: NoteModel) {
  const [editorValue, setEditorValue] = useState<string>(note.content);
  const [loading, setLoading] = useState<boolean>(false);

  const handleEditorChange = (value: string) => setEditorValue(value);

  const handleSave = () => {
    const isDark = document.documentElement.classList.contains("dark");

    try {
      setLoading(true);
      saveContentNote({ content: editorValue, noteId: note.id });
      toast.success("Nota salva com sucesso!", {
        theme: isDark ? "dark" : "light",
      });
    } catch (error) {
      toast.error("Ocorreu um erro inesperado! " + error, {
        theme: isDark ? "dark" : "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-4xl bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl border-4 border-gray-300 dark:border-gray-600"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="text-center mb-6">
        <h1 className="text-3xl font-semibold text-indigo-400 border-b-2 border-gray-300 dark:border-gray-600 pb-2">
          Nota {note.title}
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
          <ReactQuill
            value={editorValue}
            onChange={handleEditorChange}
            theme="snow"
            className="w-full bg-transparent text-gray-900 dark:text-white p-2 rounded-md border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-700"
            aria-label="Editor de texto para adicionar conteúdo"
          />
        </div>

        <div className="flex space-x-4 justify-end mt-6">
          <DrawnButton
            onClick={handleSave}
            className="bg-indigo-500 text-white hover:bg-indigo-400 transition dark:bg-indigo-700 dark:hover:bg-indigo-600"
          >
            {loading ? "Salvando..." : "Salvar"}
          </DrawnButton>
        </div>
      </div>
    </motion.div>
  );
}