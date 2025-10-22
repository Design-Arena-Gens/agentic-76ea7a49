'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { BarChart3 } from 'lucide-react'

interface DataPoint {
  category: string
  current: number
  previous: number
}

const initialData: DataPoint[] = [
  { category: 'Product A', current: 4500, previous: 4000 },
  { category: 'Product B', current: 3800, previous: 3200 },
  { category: 'Product C', current: 6200, previous: 5800 },
  { category: 'Product D', current: 5100, previous: 4900 },
  { category: 'Product E', current: 4800, previous: 5200 },
]

export default function BarChartWidget() {
  const [data, setData] = useState<DataPoint[]>(initialData)

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData =>
        prevData.map(item => ({
          ...item,
          current: Math.max(1000, item.current + Math.floor(Math.random() * 400) - 200),
          previous: item.current,
        }))
      )
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-dark-200 rounded-xl p-6 border border-gray-800 hover-lift hover:border-primary/30 transition-all">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg">
            <BarChart3 className="w-5 h-5 text-primary" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Product Performance</h3>
            <p className="text-xs text-gray-400">Current vs previous period</p>
          </div>
        </div>
        <select
          className="bg-dark-100 text-white text-xs px-3 py-1 rounded-lg border border-gray-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
          aria-label="Time period"
        >
          <option>Last 30 days</option>
          <option>Last 7 days</option>
          <option>Last 90 days</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
          <XAxis dataKey="category" stroke="#6b7280" />
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
          <Bar dataKey="previous" fill="#4a4a5e" radius={[8, 8, 0, 0]} />
          <Bar dataKey="current" fill="#6200EE" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
