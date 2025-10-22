'use client'

import { useState, useEffect } from 'react'
import { Clock, TrendingUp, Users, FileText, AlertCircle } from 'lucide-react'

interface Activity {
  id: number
  type: 'success' | 'warning' | 'info' | 'error'
  icon: 'trending' | 'users' | 'file' | 'alert'
  title: string
  description: string
  time: string
}

const activityTypes = [
  {
    type: 'success' as const,
    icon: 'trending' as const,
    title: 'Revenue milestone reached',
    description: 'Achieved $50K in monthly revenue',
  },
  {
    type: 'info' as const,
    icon: 'users' as const,
    title: 'New user registration',
    description: '125 new users joined today',
  },
  {
    type: 'warning' as const,
    icon: 'alert' as const,
    title: 'Server load increased',
    description: 'CPU usage at 78%',
  },
  {
    type: 'info' as const,
    icon: 'file' as const,
    title: 'Report generated',
    description: 'Q4 analytics report ready',
  },
]

export default function ActivityWidget() {
  const [activities, setActivities] = useState<Activity[]>([
    { ...activityTypes[0], id: 1, time: '2m ago' },
    { ...activityTypes[1], id: 2, time: '15m ago' },
    { ...activityTypes[2], id: 3, time: '1h ago' },
    { ...activityTypes[3], id: 4, time: '3h ago' },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      const randomActivity = activityTypes[Math.floor(Math.random() * activityTypes.length)]
      setActivities(prev => [
        { ...randomActivity, id: Date.now(), time: 'Just now' },
        ...prev.slice(0, 3),
      ])
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const iconMap = {
    trending: TrendingUp,
    users: Users,
    file: FileText,
    alert: AlertCircle,
  }

  const typeColors = {
    success: 'text-green-400 bg-green-400/10',
    warning: 'text-yellow-400 bg-yellow-400/10',
    info: 'text-blue-400 bg-blue-400/10',
    error: 'text-red-400 bg-red-400/10',
  }

  return (
    <div className="bg-dark-200 rounded-xl p-6 border border-gray-800 hover-lift hover:border-primary/30 transition-all">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg">
            <Clock className="w-5 h-5 text-secondary" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
            <p className="text-xs text-gray-400">Live system events</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-hidden="true"></span>
          <span className="text-xs text-gray-400">Active</span>
        </div>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = iconMap[activity.icon]
          return (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-dark-100 transition-colors animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`p-2 rounded-lg ${typeColors[activity.type]}`}>
                <Icon className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{activity.title}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.description}</p>
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
            </div>
          )
        })}
      </div>

      <button className="w-full mt-4 py-2 text-sm text-secondary hover:text-primary transition-colors font-medium">
        View all activity
      </button>
    </div>
  )
}
