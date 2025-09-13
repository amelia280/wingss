import React, { useEffect, useState } from 'react';
import api from '../api.js';
export default function LowStock() {
  const [list, setList] = useState([]);
  useEffect(() => { api.get('/reports/low-stock').then(r => setList(r.data)); }, []);
  if (!list.length) return null;
  return <div className="bg-red-100 text-red-700 p-4 rounded">⚠️ Low stock: {list.map(p => p.name).join(', ')}</div>;
}