'use client'

import { Search, Bell, Settings, Menu } from 'lucide-react'
import { useState } from 'react'

interface HeaderProps {
  toggleSidebar: () => void
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const [notifications] = useState(3)

  return (
    <header className="bg-dark-200 border-b border-gray-800 px-6 py-4" role="banner">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-dark-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5 text-gray-400" />
          </button>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search dashboards, metrics, users..."
              className="w-full bg-dark-100 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              aria-label="Search"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="relative p-2 rounded-lg hover:bg-dark-100 transition-colors group"
            aria-label={`Notifications (${notifications} unread)`}
          >
            <Bell className="w-5 h-5 text-gray-400 group-hover:text-secondary transition-colors" />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full animate-pulse" aria-hidden="true"></span>
            )}
          </button>

          <button
            className="p-2 rounded-lg hover:bg-dark-100 transition-colors group"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
          </button>

          <div className="flex items-center space-x-3 pl-4 border-l border-gray-700">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white">Alex Rivera</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
            <button
              className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold hover:scale-105 transition-transform focus:ring-2 focus:ring-secondary focus:outline-none"
              aria-label="User profile"
            >
              AR
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
