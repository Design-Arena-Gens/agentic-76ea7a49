'use client'

import { TrendingUp, TrendingDown, DollarSign, Users, Target, Zap } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string
  change: number
  trend: 'up' | 'down'
  icon: 'dollar' | 'users' | 'target' | 'zap'
}

const iconMap = {
  dollar: DollarSign,
  users: Users,
  target: Target,
  zap: Zap,
}

export default function KPICard({ title, value, change, trend, icon }: KPICardProps) {
  const Icon = iconMap[icon]
  const isPositive = trend === 'up'

  return (
    <div className="bg-dark-200 rounded-xl p-6 border border-gray-800 hover-lift hover:border-primary/30 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg">
          <Icon className="w-6 h-6 text-secondary" aria-hidden="true" />
        </div>
        <div
          className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-3 h-3" aria-hidden="true" />
          ) : (
            <TrendingDown className="w-3 h-3" aria-hidden="true" />
          )}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>

      <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>

      <div className="mt-4 pt-4 border-t border-gray-800">
        <p className="text-xs text-gray-500">
          {isPositive ? 'Increased' : 'Decreased'} from last week
        </p>
      </div>
    </div>
  )
}
