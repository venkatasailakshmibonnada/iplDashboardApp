const React = require('react')

const PieChart = ({children, width, height}) =>
  React.createElement('div', {className: 'recharts-wrapper'}, children)

const Pie = ({children, data}) =>
  React.createElement(
    'div',
    {className: 'recharts-pie'},
    children,
  )

const Cell = ({name, fill}) =>
  React.createElement('div', {className: 'recharts-cell'})

const Legend = ({iconType}) =>
  React.createElement(
    'div',
    {className: 'recharts-legend-wrapper'},
    React.createElement('div', {className: 'recharts-legend-item-text'}, 'Won'),
    React.createElement('div', {className: 'recharts-legend-item-text'}, 'Lost'),
    React.createElement('div', {className: 'recharts-legend-item-text'}, 'Drawn'),
  )

const ResponsiveContainer = ({children, width, height}) =>
  React.createElement('div', {className: 'recharts-responsive-container'}, children)

module.exports = {PieChart, Pie, Cell, Legend, ResponsiveContainer}
