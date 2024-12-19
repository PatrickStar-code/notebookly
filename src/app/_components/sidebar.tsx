"use client";
import Link from "next/link";
import { LogOutIcon } from "lucide-react";
import logout from "../_actions/logout";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ILink } from "../Main/layout";
import { NotebookModel, NoteModel } from "@prisma/client";

interface InfoResponse {
  notes: NoteModel[];
  notebooks: NotebookModel[];
}

interface SidebarProps {
  links: ILink[];
  userName: string;
  userImage?: string;
  infos: InfoResponse;
}

export default function Sidebar({
  links,
  userName,
  userImage,
  infos,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="hidden sm:flex flex-col h-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 shadow-lg lg:w-60">
      {/* Título da Sidebar */}
      <div className="flex-shrink-0 p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-center font-edu text-gray-800 dark:text-gray-50">
          Notebookly
        </h1>
      </div>

      {/* Informações do Usuário */}
      <div className="p-4 flex items-center space-x-3 border-b border-gray-200 dark:border-gray-700">
        {userImage ? (
          <Image
            src={userImage}
            alt="Imagem do usuário"
            width={48}
            height={48}
            className="rounded-full"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-white text-lg font-semibold">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <div className="text-sm font-semibold">{userName}</div>
          <div className="text-xs text-gray-400 dark:text-gray-300">
            Usuário
          </div>
        </div>
      </div>

      {/* Links de Navegação */}
      <nav className="flex flex-col flex-grow p-4">
        <ul className="space-y-2">
          {links.map((link) => (
            <Link key={link.title} href={link.href}>
              <li
                className={`flex items-center space-x-3 p-3 rounded-lg text-sm font-medium cursor-pointer transition-colors duration-300 ${
                  pathname === link.href
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500"
                    : "hover:bg-blue-100 dark:hover:bg-gray-600 hover:text-blue-700 dark:hover:text-blue-300"
                }`}
              >
                {link.icon}
                <span>{link.title}</span>
              </li>
            </Link>
          ))}
        </ul>

        {/* Seção de Informações Dinâmicas */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
            Últimos Cadernos Criados
          </h3>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-xs">
            {infos.notebooks.length === 0 && (
              <li className="p-2 rounded-lg transition-colors duration-300 hover:bg-blue-100 dark:hover:bg-gray-600 hover:text-blue-700 dark:hover:text-blue-300">
                Nenhum caderno criado
              </li>
            )}
            {infos.notebooks.slice(0, 3).map((notebook) => (
              <Link key={notebook.id} href={`/Main/notebook/${notebook.id}`}>
                <li
                  className={`truncate p-2 rounded-lg cursor-pointer transition-colors duration-300 ${
                    pathname === `/Main/notebook/${notebook.id}`
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      : "hover:bg-blue-100 dark:hover:bg-gray-600 hover:text-blue-700 dark:hover:text-blue-300"
                  }`}
                >
                  {notebook.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
            Últimas Notas Criadas
          </h3>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-xs">
            {infos.notes.length === 0 && (
              <li className="p-2 rounded-lg  transition-colors duration-300 hover:bg-blue-100 dark:hover:bg-gray-600 hover:text-blue-700 dark:hover:text-blue-300">
                Nenhuma nota criada
              </li>
            )}
            {infos.notes.map((note) => (
              <Link key={note.id} href={`/Main/note/${note.id}`}>
                <li
                  className={`truncate p-2 rounded-lg cursor-pointer transition-colors duration-300 ${
                    pathname === `/Main/note/${note.id}`
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      : "hover:bg-blue-100 dark:hover:bg-gray-600 hover:text-blue-700 dark:hover:text-blue-300"
                  }`}
                >
                  {note.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </nav>

      {/* Botão de Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => logout()}
          className="flex items-center space-x-3 p-2 w-full text-left text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
        >
          <LogOutIcon size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
