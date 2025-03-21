import React from 'react'
import Navigation from '../../components/Navigation.component'

export const metadata = {
  description: 'Task Management Application',
  title: 'Task Management',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <Navigation />
        <div className='pt-0'>{children}</div>
    </>
  )
}