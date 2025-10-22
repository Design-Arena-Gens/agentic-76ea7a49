'use client'

import { useState, useEffect } from 'react'
import { Trophy, TrendingUp } from 'lucide-react'

interface Performer {
  id: number
  name: string
  value: number
  change: number
  avatar: string
}

const initialPerformers: Performer[] = [
  { id: 1, name: 'Sarah Chen', value: 12450, change: 15.2, avatar: 'SC' },
  { id: 2, name: 'Marcus Rodriguez', value: 11230, change: 12.8, avatar: 'MR' },
  { id: 3, name: 'Emily Johnson', value: 10890, change: 9.5, avatar: 'EJ' },
  { id: 4, name: 'David Kim', value: 9670, change: 7.3, avatar: 'DK' },
  { id: 5, name: 'Lisa Anderson', value: 8920, change: 5.1, avatar: 'LA' },
]

export default function TopPerformersWidget() {
  const [performers, setPerformers] = useState<Performer[]>(initialPerformers)

  useEffect(() => {
    const interval = setInterval(() => {
      setPerformers(prev =>
        prev.map(p => ({
          ...p,
          value: Math.max(5000, p.value + Math.floor(Math.random() * 200) - 100),
          change: Math.max(0, p.change + (Math.random() * 2 - 1)),
        }))
      )
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const colors = ['#6200EE', '#7C4DFF', '#9575CD', '#B39DDB', '#D1C4E9']

  return (
    <div className="bg-dark-200 rounded-xl p-6 border border-gray-800 hover-lift hover:border-secondary/30 transition-all">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg">
            <Trophy className="w-5 h-5 text-primary" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Top Performers</h3>
            <p className="text-xs text-gray-400">By sales volume</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {performers.map((performer, index) => (
          <div
            key={performer.id}
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-dark-100 transition-all group"
          >
            <div className="flex items-center space-x-3 flex-1">
              <span className="text-sm font-bold text-gray-500 w-6">{index + 1}</span>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm group-hover:scale-110 transition-transform"
                style={{ background: `linear-gradient(135deg, ${colors[index]}, #00BCD4)` }}
              >
                {performer.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{performer.name}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex-1 bg-dark-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(performer.value / performers[0].value) * 100}%`,
                        background: `linear-gradient(90deg, ${colors[index]}, #00BCD4)`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-white">${(performer.value / 1000).toFixed(1)}K</p>
              <div className="flex items-center space-x-1 text-xs text-green-400 mt-1">
                <TrendingUp className="w-3 h-3" aria-hidden="true" />
                <span>{performer.change.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-sm text-secondary hover:text-primary transition-colors font-medium">
        View leaderboard
      </button>
    </div>
  )
}
