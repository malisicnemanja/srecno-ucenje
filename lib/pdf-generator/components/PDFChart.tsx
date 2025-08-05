import React from 'react'
import { View, Text, Svg, Rect, Line, Circle } from '@react-pdf/renderer'
import { colors } from '../styles/pdfStyles'

interface ChartData {
  labels: string[]
  values: number[]
  title: string
}

export const PDFBarChart: React.FC<{ data: ChartData }> = ({ data }) => {
  const maxValue = Math.max(...data.values)
  const chartHeight = 150
  const chartWidth = 400
  const barWidth = chartWidth / data.values.length * 0.7
  
  return (
    <View style={{ marginVertical: 20 }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>
        {data.title}
      </Text>
      <Svg width={chartWidth} height={chartHeight}>
        {/* Y axis */}
        <Line
          x1={30}
          y1={0}
          x2={30}
          y2={chartHeight - 20}
          strokeWidth={1}
          stroke={colors.gray[300]}
        />
        
        {/* X axis */}
        <Line
          x1={30}
          y1={chartHeight - 20}
          x2={chartWidth}
          y2={chartHeight - 20}
          strokeWidth={1}
          stroke={colors.gray[300]}
        />
        
        {/* Bars */}
        {data.values.map((value, index) => {
          const barHeight = (value / maxValue) * (chartHeight - 40)
          const x = 40 + (index * (chartWidth - 40) / data.values.length)
          const y = chartHeight - 20 - barHeight
          
          return (
            <React.Fragment key={index}>
              <Rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={colors.primary}
              />
              <Text
                x={x + barWidth / 2 - 10}
                y={chartHeight - 15}
                style={{ fontSize: 10 }}
              >
                {data.labels[index]}
              </Text>
            </React.Fragment>
          )
        })}
      </Svg>
    </View>
  )
}