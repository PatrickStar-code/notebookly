"use client"
import { useState, useEffect } from 'react';

export default function ThemeToggleButton() {
// Estado para o tema (inicializa com o valor do tema do navegador)
const [isDarkMode, setIsDarkMode] = useState(false);

useEffect(() => {
  // Verifica a preferência de tema do navegador ao carregar
  const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)').matches;

  setIsDarkMode(darkModePreference);

  if (darkModePreference) {
    console.log('darkModePreference', darkModePreference);
    document.documentElement.classList.add('dark');
  }
}, []);

const handleToggle = () => {
  setIsDarkMode(prevIsDarkMode => {
    const newIsDarkMode = !prevIsDarkMode;
    if (newIsDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('white');
    } else {
      document.documentElement.classList.add('white');
      document.documentElement.classList.remove('dark');
    }
    return newIsDarkMode;
  });
};


  return (
    <div 
      className={`relative flex justify-center items-center w-10 h-10 
                  rounded-full border-2 border-gray-800 
                  ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
                  shadow-[4px_4px_0px_0px] shadow-gray-800
                  transition-transform duration-100 ease-in-out
                  active:shadow-none active:translate-x-[3px] active:translate-y-[3px]`}
      onClick={handleToggle}
    >
      {/* Ícone Lua (modo escuro) */}
      {isDarkMode ? (
   <svg viewBox="0 0 24 24" className="absolute w-6 h-6 fill-white"><path d="m12.3 4.9c.4-.2.6-.7.5-1.1s-.6-.8-1.1-.8c-4.9.1-8.7 4.1-8.7 9 0 5 4 9 9 9 3.8 0 7.1-2.4 8.4-5.9.2-.4 0-.9-.4-1.2s-.9-.2-1.2.1c-1 .9-2.3 1.4-3.7 1.4-3.1 0-5.7-2.5-5.7-5.7 0-1.9 1.1-3.8 2.9-4.8zm2.8 12.5c.5 0 1 0 1.4-.1-1.2 1.1-2.8 1.7-4.5 1.7-3.9 0-7-3.1-7-7 0-2.5 1.4-4.8 3.5-6-.7 1.1-1 2.4-1 3.8-.1 4.2 3.4 7.6 7.6 7.6z"></path></svg>
      ) : (
        /* Ícone Sol (modo claro) */
        <svg className="absolute w-6 h-6 stroke-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5" fill="none" strokeWidth="2" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeWidth="2"/>
        </svg>
      )}
    </div>
  );
}
