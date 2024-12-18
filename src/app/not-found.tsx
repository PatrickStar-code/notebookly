"use client";
import { motion } from "framer-motion";
import DrawnButton from "./_components/drawnButton";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <motion.div
        className="bg-white shadow-lg rounded-lg p-8 border-2 border-gray-300 w-96 h-[28rem] relative dark:bg-gray-800 dark:border-gray-700"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Background lines */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-100 to-transparent dark:via-gray-800"
          style={{
            backgroundImage:
              "repeating-linear-gradient(white, white 3.5rem, #e5e7eb 3.6rem)",
          }}
        ></div>

        {/* Margin line */}
        <motion.div
          className="absolute top-0 left-10 w-px h-full bg-blue-500 hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-300"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        ></motion.div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center min-h-full justify-center text-center">
          <motion.h1
            className="text-6xl font-bold text-gray-800 mb-4 "
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            404
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 mb-6 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Não foi possível encontrar
          </motion.p>
          <div className="text-center">
            <motion.div
              className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={"/Main"}>
                <DrawnButton className="p-4">
                  Voltar para a página principal
                </DrawnButton>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Doodles */}
        <motion.div
          className="absolute top-4 right-4 text-gray-400 text-xl font-bold dark:text-gray-500"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 0.6 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          ?
        </motion.div>
        <motion.div
          className="absolute bottom-8 left-8 text-gray-400 text-xl font-bold rotate-45 dark:text-gray-500"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 0.6 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          →
        </motion.div>
        <motion.div
          className="absolute bottom-4 right-6 text-gray-400 text-sm italic dark:text-gray-500"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 0.6 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          &quot; Perdido? &quot;
        </motion.div>
      </motion.div>
    </div>
  );
}
