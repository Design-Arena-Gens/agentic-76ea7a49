'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Activity } from 'lucide-react'

interface DataPoint {
  name: string
  revenue: number
  users: number
}

const initialData: DataPoint[] = [
  { name: 'Jan', revenue: 4200, users: 2400 },
  { name: 'Feb', revenue: 5300, users: 2800 },
  { name: 'Mar', revenue: 4800, users: 2600 },
  { name: 'Apr', revenue: 6100, users: 3200 },
  { name: 'May', revenue: 5900, users: 3100 },
  { name: 'Jun', revenue: 7200, users: 3800 },
  { name: 'Jul', revenue: 6800, users: 3600 },
]

export default function LineChartWidget() {
  const [data, setData] = useState<DataPoint[]>(initialData)

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData]
        const lastItem = newData[newData.length - 1]
        newData.shift()
        newData.push({
          name: String.fromCharCode(65 + Math.floor(Math.random() * 26)),
          revenue: lastItem.revenue + Math.floor(Math.random() * 1000) - 500,
          users: lastItem.users + Math.floor(Math.random() * 400) - 200,
        })
        return newData
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-dark-200 rounded-xl p-6 border border-gray-800 hover-lift hover:border-secondary/30 transition-all">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-lg">
            <Activity className="w-5 h-5 text-secondary" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Revenue & User Growth</h3>
            <p className="text-xs text-gray-400">Monthly trends over time</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" aria-hidden="true"></span>
          <span className="text-xs text-gray-400">Live</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6200EE" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#6200EE" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00BCD4" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00BCD4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1a1a2e',
              border: '1px solid #6200EE',
              borderRadius: '8px',
              color: '#ffffff',
            }}
            labelStyle={{ color: '#00BCD4' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#6200EE"
            strokeWidth={3}
            dot={{ fill: '#6200EE', r: 4 }}
            activeDot={{ r: 6 }}
            fill="url(#colorRevenue)"
          />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#00BCD4"
            strokeWidth={3}
            dot={{ fill: '#00BCD4', r: 4 }}
            activeDot={{ r: 6 }}
            fill="url(#colorUsers)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
