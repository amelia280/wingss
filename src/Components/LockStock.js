import React, { useEffect, useState } from 'react';
import api from '../api.js';

export default function LowStock() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.get('/reports/low-stock').then(res => setList(res.data));
  }, []);

  if (!list.length) return null;

  return React.createElement(
    'div',
    { className: 'bg-red-100 text-red-700 p-4 rounded' },
    '⚠️ Low stock: ' + list.map(p => p.name).join(', ')
  );
}