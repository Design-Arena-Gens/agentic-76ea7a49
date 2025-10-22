'use client'

import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { PieChart as PieChartIcon } from 'lucide-react'

interface DataPoint {
  name: string
  value: number
  color: string
}

const initialData: DataPoint[] = [
  { name: 'Direct', value: 4200, color: '#6200EE' },
  { name: 'Organic', value: 3800, color: '#00BCD4' },
  { name: 'Referral', value: 2400, color: '#9C27B0' },
  { name: 'Social', value: 1800, color: '#26C6DA' },
  { name: 'Email', value: 1200, color: '#BA68C8' },
]

export default function DonutChartWidget() {
  const [data, setData] = useState<DataPoint[]>(initialData)

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData =>
        prevData.map(item => ({
          ...item,
          value: Math.max(500, item.value + Math.floor(Math.random() * 200) - 100),
        }))
      )
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="bg-dark-200 rounded-xl p-6 border border-gray-800 hover-lift hover:border-secondary/30 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg">
            <PieChartIcon className="w-5 h-5 text-primary" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Traffic Sources</h3>
            <p className="text-xs text-gray-400">Distribution by channel</p>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1a1a2e',
              border: '1px solid #6200EE',
              borderRadius: '8px',
              color: '#ffffff',
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
                aria-hidden="true"
              ></div>
              <span className="text-sm text-gray-400">{item.name}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-white">
                {((item.value / total) * 100).toFixed(1)}%
              </span>
              <span className="text-xs text-gray-500 ml-2">{item.value.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
