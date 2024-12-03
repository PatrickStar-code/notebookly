"use client";
import { ILink } from "../main/layout";
import Link from "next/link";
import { LogOutIcon } from "lucide-react";
import logout from "../_actions/logout";
import Image from "next/image";
import { usePathname } from "next/navigation"; // Importa o usePathname para pegar o caminho atual

interface SidebarProps {
  links: ILink[];
  userName: string;
  userImage?: string;
}

export default function Sidebar({ links, userName, userImage }: SidebarProps) {
  const pathname = usePathname(); // Obtém o caminho atual

  return (
    <div className="hidden sm:flex flex-col h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg lg:w-48">
      {/* Título da Sidebar */}
      <div className="flex-shrink-0 p-4 border-b border-gray-300 dark:border-gray-700">
        <span className="block font-semibold text-2xl text-center font-edu">
          Notebookly
        </span>
      </div>

      {/* Seção de Informações do Usuário */}
      <div className="p-4 flex items-center space-x-3 border-b border-gray-300 dark:border-gray-700">
        {userImage ? (
          <Image
            src={userImage}
            alt="Imagem do usuário"
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-semibold">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <div className="text-sm font-semibold text-gray-800 dark:text-white">
            {userName}
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-300">
            Usuário
          </div>
        </div>
      </div>

      {/* Navegação */}
      <nav className="flex flex-grow flex-col justify-between gap-4 overflow-y-auto">
        <ul className="space-y- p-4 ">
          {links.map((link) => (
            <Link key={link.title} href={link.href}>
              <li
                className={`flex items-center md:justify-center lg:justify-normal space-x-3 p-2 mt-2 rounded transition duration-200 ${
                  pathname === link.href
                    ? "bg-gray-200 dark:bg-gray-800" // Adiciona um destaque ao link ativo
                    : "hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                {link.icon}
                <span className="hidden md:hidden lg:inline">{link.title}</span>
              </li>
            </Link>
          ))}
        </ul>
        <ul className="p-4">
          <li
            onClick={() => logout()}
            className="flex items-center cursor-pointer md:justify-center lg:justify-normal space-x-3 hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded transition duration-200"
          >
            <LogOutIcon size={18} />
            <span className="hidden md:hidden lg:inline">Logout</span>
          </li>
        </ul>
      </nav>
    </div>
  );
}
