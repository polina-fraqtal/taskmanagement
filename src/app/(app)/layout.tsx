import React from 'react'

export const metadata = {
  description: 'Task Management Application',
  title: 'Task Management',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className='dark mx-auto'>
      <body> 
        <div className='pt-0'>{children}</div>
      </body>
    </html>
  )
}