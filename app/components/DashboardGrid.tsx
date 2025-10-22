'use client'

import { useEffect, useState } from 'react'
import KPICard from './widgets/KPICard'
import LineChartWidget from './widgets/LineChartWidget'
import BarChartWidget from './widgets/BarChartWidget'
import DonutChartWidget from './widgets/DonutChartWidget'
import ActivityWidget from './widgets/ActivityWidget'
import TopPerformersWidget from './widgets/TopPerformersWidget'

export default function DashboardGrid() {
  const [revenue, setRevenue] = useState(48523)
  const [users, setUsers] = useState(12847)
  const [conversion, setConversion] = useState(3.42)
  const [engagement, setEngagement] = useState(68.5)

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRevenue(prev => prev + Math.floor(Math.random() * 100) - 50)
      setUsers(prev => prev + Math.floor(Math.random() * 10) - 5)
      setConversion(prev => Math.max(0, Math.min(100, prev + (Math.random() * 0.2 - 0.1))))
      setEngagement(prev => Math.max(0, Math.min(100, prev + (Math.random() * 2 - 1))))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          Dashboard <span className="text-gradient">Overview</span>
        </h1>
        <p className="text-gray-400">Real-time insights and performance metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <KPICard
          title="Total Revenue"
          value={`$${revenue.toLocaleString()}`}
          change={12.5}
          trend="up"
          icon="dollar"
        />
        <KPICard
          title="Active Users"
          value={users.toLocaleString()}
          change={8.2}
          trend="up"
          icon="users"
        />
        <KPICard
          title="Conversion Rate"
          value={`${conversion.toFixed(2)}%`}
          change={-2.1}
          trend="down"
          icon="target"
        />
        <KPICard
          title="Engagement Score"
          value={`${engagement.toFixed(1)}%`}
          change={5.7}
          trend="up"
          icon="zap"
        />
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <LineChartWidget />
        <BarChartWidget />
      </div>

      {/* Secondary Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DonutChartWidget />
        <ActivityWidget />
        <TopPerformersWidget />
      </div>
    </div>
  )
}
