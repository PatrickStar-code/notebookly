import React from 'react';
import { ILink } from '../Main/layout';
import Link from 'next/link';

export default function Sidebar({links}: {links: ILink[]}) {
    return (
        <div className="hidden sm:flex flex-col h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg lg:w-48">
            <div className="flex-shrink-0 p-4 border-b border-gray-300 dark:border-gray-700">
                <span className="block font-semibold text-lg">Notebookly</span>
            </div>
            <nav className="flex-grow">
                <ul className="space-y-2 p-4">
                    {
                        links.map((link) => (
                            <Link key={link.title} href={link.href}>
                            <li key={link.title} className="flex items-center space-x-3 hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded transition duration-200">
                                {link.icon}
                                <span className="hidden md:hidden lg:inline ">{link.title}</span>
                            </li>
                            </Link>
                    ))}
                        
                </ul>
            </nav>
        </div>
    );
};

