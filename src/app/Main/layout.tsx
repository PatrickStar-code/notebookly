import React from "react";

import { IconNote, IconNotebook } from "@tabler/icons-react";
import { FloatingDockDemo } from "../_components/dock";
import Sidebar from "../_components/sidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import getDescInfo from "../_actions/getDescInfo";

export interface ILink {
  title: string;
  icon: React.ReactNode;
  href: string;
}

export default async function PagesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const links: ILink[] = [
    {
      title: "Cadernos",
      icon: (
        <IconNotebook className="h-full w-5 text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/Main",
    },

    {
      title: "Notas",
      icon: (
        <IconNote className="h-full w-5 text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/Main/note",
    },
  ];

  const session = await auth();
  const infos = await getDescInfo(session?.user?.id as string);

  if (!session) {
    return redirect("/");
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        links={links}
        userName={session?.user?.name ? session.user.name : "Nome Padrão"}
        userImage={session?.user?.image ? session.user.image : ""} // imagem vazia se não houver
        infos={infos}
      />

      <div className="flex-grow p-6 bg-gray-100 dark:bg-gray-700 overflow-y-auto">
        {children}
        <div className="block sm:hidden">
          <FloatingDockDemo links={links} />
        </div>
      </div>
    </div>
  );
}
