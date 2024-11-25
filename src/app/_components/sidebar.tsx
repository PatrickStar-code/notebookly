"use client";
import { ILink } from "../main/layout";
import Link from "next/link";
import { LogOutIcon } from "lucide-react";
import logout from "../_actions/logout";

export default function Sidebar({ links }: { links: ILink[] }) {
  return (
    <div className="hidden sm:flex flex-col h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg lg:w-48">
      <div className="flex-shrink-0 p-4 border-b border-gray-300 dark:border-gray-700">
        <span className="block font-semibold text-2xl text-center font-edu">
          Notebookly
        </span>
      </div>
      <nav className="flex flex-grow flex-col justify-between">
        {/* Links de navegação */}
        <ul className="space-y-2 p-4">
          {links.map((link) => (
            <Link key={link.title} href={link.href}>
              <li
                key={link.title}
                className="flex items-center md:justify-center lg:justify-normal space-x-3 hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded transition duration-200"
              >
                {link.icon}
                <span className="hidden md:hidden lg:inline">{link.title}</span>
              </li>
            </Link>
          ))}
        </ul>

        {/* Botão Logout */}
        <ul className="p-4">
          <>
            <li
              onClick={() => logout()}
              className="flex items-center md:justify-center lg:justify-normal space-x-3 hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded transition duration-200"
            >
              <LogOutIcon size={18} />
              <span className="hidden md:hidden lg:inline">Logout</span>
            </li>
          </>
        </ul>
      </nav>
    </div>
  );
}
