'use client'

import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import DashboardGrid from './components/DashboardGrid'

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-dark-300">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-6">
          <DashboardGrid />
        </main>
      </div>
    </div>
  )
}
