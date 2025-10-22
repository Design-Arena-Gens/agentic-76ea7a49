'use client'

import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  FileText,
  TrendingUp,
  Database,
  Bell,
  ChevronLeft
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: BarChart3, label: 'Analytics', active: false },
  { icon: TrendingUp, label: 'Performance', active: false },
  { icon: Users, label: 'Users', active: false },
  { icon: Database, label: 'Data Sources', active: false },
  { icon: FileText, label: 'Reports', active: false },
  { icon: Bell, label: 'Notifications', active: false },
  { icon: Settings, label: 'Settings', active: false },
]

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      <aside
        className={`${
          isOpen ? 'w-64' : 'w-20'
        } bg-dark-200 border-r border-gray-800 transition-all duration-300 ease-in-out flex flex-col relative`}
        aria-label="Sidebar navigation"
      >
        <div className="p-6 flex items-center justify-between border-b border-gray-800">
          {isOpen && (
            <div className="flex items-center space-x-3 animate-fade-in">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">DataViz</span>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-dark-100 transition-colors ml-auto"
            aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <ChevronLeft
              className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                !isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        <nav className="flex-1 py-6" role="navigation">
          <ul className="space-y-2 px-3">
            {navItems.map((item, index) => (
              <li key={index}>
                <button
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                    item.active
                      ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-white'
                      : 'text-gray-400 hover:bg-dark-100 hover:text-white'
                  }`}
                  aria-label={item.label}
                  aria-current={item.active ? 'page' : undefined}
                >
                  <item.icon
                    className={`w-5 h-5 transition-transform duration-200 ${
                      item.active ? 'text-secondary' : 'group-hover:scale-110'
                    }`}
                  />
                  {isOpen && (
                    <span className="font-medium animate-fade-in">{item.label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-800">
          {isOpen ? (
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-4 border border-primary/20 animate-fade-in">
              <h4 className="text-sm font-semibold mb-2">Upgrade to Pro</h4>
              <p className="text-xs text-gray-400 mb-3">
                Unlock advanced analytics and unlimited data sources
              </p>
              <button className="w-full bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                Upgrade Now
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg opacity-50"></div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
