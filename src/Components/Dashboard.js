import React, { useEffect, useState } from 'react';
import { lowStockReport } from '../api/api';

const el = React.createElement;

/* ---------- tiny card helper ---------- */
const MetricCard = ({ title, value, color }) =>
  el('div', { className: 'column is-6', key: title },
    el('div', {
        className: `box has-text-centered has-background-${color}-dark has-text-white`,
        style: { borderRadius: '12px', padding: '2rem' }
      }, [
        el('p', { className: 'heading is-size-5' }, title),
        el('p', {
            className: 'title is-2 has-text-white',
            style: { fontWeight: 700, letterSpacing: '1px' }
          }, value)
      ])
  );

export default function Dashboard() {
  const [low, setLow] = useState([]);

  /* ---------- dummy daily figures ---------- */
  const salesCount = 0;
  const moneyToday = 0;

  useEffect(() => {
    lowStockReport().then(setLow);
  }, []);

  return el('div', { className: 'dashboard' }, [
    el('h1', { key: 'h1', className: 'title is-3' }, 'WELCOME TO WINGS ❤️'),

    /* ---------- new metric row ---------- */
    el('div', { className: 'columns is-variable is-6', key: 'metrics' }, [
      el(MetricCard, { title: 'Total Sales Today',        value: salesCount,         color: 'info' }),
      el(MetricCard, { title: 'Money Collected Today',    value: `R ${moneyToday.toFixed(2)}`, color: 'success' })
    ]),

    /* ---------- existing low-stock banner ---------- */
    low.length > 0 &&
      el('div', { className: 'notification is-warning', key: 'low' },
        `⚠️ Low stock: ${low.map(p => p.name).join(', ')}`
      ),

    el('p', { key: 'price', className: 'has-text-grey' }, 'LOW PRICE')
  ]);
}