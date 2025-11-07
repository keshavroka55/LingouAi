import type React from "react"
import { ResponsiveContainer } from "recharts"
import { Cell, PieChart, Pie } from "recharts"

interface ChartContainerProps {
  children: React.ReactElement
  className?: string
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ children, className }) => {
  return (
    <ResponsiveContainer width="100%" height={300} className={className}>
      {children}
    </ResponsiveContainer>
  )
}

interface ChartTooltipProps {
  payload: any[]
  label: string
  formatter?: (value: any) => string
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({ payload, label, formatter }) => {
  if (payload && payload.length > 0) {
    return (
      <div className="p-2 bg-gray-800 border border-gray-700 rounded-md shadow-md">
        <p className="text-sm font-medium text-gray-200">{label}</p>
        {payload.map((item, index) => (
          <p key={index} className="text-xs text-gray-300">
            {item.name}: {formatter ? formatter(item.value) : item.value}
          </p>
        ))}
      </div>
    )
  }

  return null
}

export { PieChart, Pie, Cell }
