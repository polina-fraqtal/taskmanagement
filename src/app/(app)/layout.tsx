import React from 'react'
import Navigation from '../components/Navigation.component'

export const metadata = {
  description: 'Task Management Application',
  title: 'Task Management',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className='dark mx-auto'>
      <body> 
        <Navigation />
        {children}
      </body>
    </html>
  )
}