import React from 'react'

export default function PagesLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <div>
      navbar
      {children}
    </div>
  )
}
