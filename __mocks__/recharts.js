import React from 'react'

const PieChart = ({children}) => <div data-testid="pie-chart">{children}</div>

const Pie = ({data, children}) => (
  <div className="recharts-pie">
    {data &&
      data.map(entry => (
        <div key={entry.name}>
          {entry.name}: {entry.value}
        </div>
      ))}
    {children}
  </div>
)

const Cell = () => <div />

const Legend = ({payload}) => (
  <div className="recharts-legend-wrapper">
    {payload &&
      payload.map(entry => (
        <div key={entry.value} className="recharts-legend-item">
          <span className="recharts-legend-item-text">{entry.value}</span>
        </div>
      ))}
  </div>
)

const ResponsiveContainer = ({children}) => <div>{children}</div>

export {PieChart, Pie, Cell, Legend, ResponsiveContainer}
