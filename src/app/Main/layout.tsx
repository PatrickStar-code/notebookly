import React from 'react'
import { FloatingDockDemo } from '../components/dock'
import Sidebar from '../components/sidebar'
import { link } from 'fs'
import { IconHome, IconNewSection, IconTerminal2 } from '@tabler/icons-react'

export    interface ILink {
  title: string;
  icon: React.ReactNode;
  href: string;
}


export default function PagesLayout({children}: Readonly<{children: React.ReactNode}>) {



  const links : ILink[] = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-5 text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Products",
      icon: (
        <IconTerminal2 className="h-full w-5 text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Components",
      icon: (
        <IconNewSection className="h-full w-5 text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    }
  ]

  return (
    <div className="flex">
      <Sidebar links={links}/>
      <div className="flex-grow p-6 bg-gray-100 dark:bg-gray-700">
        <h2 className="text-2xl">Conteúdo Principal</h2>
        <p>Este é o conteúdo principal do aplicativo.</p>
   
        <div className="block sm:hidden">
          <FloatingDockDemo links={links}/>
        </div>
      </div>
    </div>
  )
}
