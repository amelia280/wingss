import React, { useEffect, useState } from 'react';
import { yearlySales, monthlySales, ytdSales } from '../api/api';

export default function Reports() {
  const [yr, setYr]   = useState([]);
  const [month, setMonth] = useState(0);
  const [ytd, setYtd]     = useState(0);

  useEffect(() => {
    yearlySales().then(setYr).catch(() => setYr(Array(12).fill(0)));
    monthlySales().then(r => setMonth(r.total || 0)).catch(() => setMonth(0));
    ytdSales().then(r => setYtd(r.total || 0)).catch(() => setYtd(0));
  }, []);



  const barWidth = 30, barGap = 10, height = 120;
  const max = Math.max(...yr, 1);
  const yrData   = Array.isArray(yr)   ? yr   : Array(12).fill(0);
const monthTot = month ? month : 0;
const ytdTot   = ytd   ? ytd   : 0;
const goal     = 500000;
const ytdPct   = ytdTot ? Math.round((ytdTot / goal) * 100) : 0;

return React.createElement('div', { className: 'card' }, [
  React.createElement('h2', { key: 'h' }, 'Sales Reports'),
  React.createElement('div', { key: 'cards', className: 'kpi-cards' }, [
    kpiCard('YTD Sales',     ytdTot,  ytdPct + '%',  'blue'),
    kpiCard('Monthly Sales', monthTot,'82%',         'orange'),
    kpiCard('Yearly Goal',   goal,    ytdPct + '%',  'green')
  ]),
  React.createElement('div', { key: 'chart', className: 'chart-card' }, [
    React.createElement('h3', { key: 'h3' }, 'Yearly Sales (AUD)'),
    React.createElement('svg', { key: 'svg', width: 12 * (barWidth + barGap), height: height + 20 },
      yrData.map((v, i) =>
        React.createElement('rect', {
          key: i,
          x: i * (barWidth + barGap),
          y: height - ((v || 0) / max) * height,
          width: barWidth,
          height: ((v || 0) / max) * height,
          fill: '#2f5bea',
          rx: 4
        })
      ).concat(
        ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          .map((m, i) =>
            React.createElement('text', {
              key: 't' + i,
              x: i * (barWidth + barGap) + barWidth / 2,
              y: height + 16,
              textAnchor: 'middle',
              fontSize: 10,
              fill: '#718096'
            }, m)
          )
      )
    )
  ])
]);

/* ---------- helper ---------- */
function kpiCard(title, value, percent, color) {
  const colors = { blue: '#2f5bea', orange: '#f97316', green: '#16a34a' };
  return React.createElement('div', { className: 'kpi-card', style: { borderLeft: `6px solid ${colors[color]}` } }, [
    React.createElement('div', { key: 'tit', className: 'kpi-title' }, title),
    React.createElement('div', { key: 'val', className: 'kpi-value' }, value ? `$${value.toLocaleString()}` : '$0'),
    React.createElement('div', { key: 'pct', className: 'kpi-percent' }, percent)
  ]);
}




}