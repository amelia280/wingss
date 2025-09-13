const BASE = 'http://localhost:5000/api';

/* ---- safe fetch ---- */
const req = (url, opts = {}) =>
  fetch(url, { ...opts, headers: { ...opts.headers, 'Content-Type': 'application/json' } })
    .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
    .catch(() => ([])); // return empty array on any error

/* ---- exports ---- */
export const fetchProducts  = () => req(`${BASE}/products`);
export const createProduct  = p => req(`${BASE}/products`,  { method: 'POST', body: JSON.stringify(p) });
export const deleteProduct  = id => req(`${BASE}/products/${id}`, { method: 'DELETE' });
export const lowStockReport = () => req(`${BASE}/reports/low-stock`);
export const fetchSales     = () => req(`${BASE}/sales`);
export const createSale     = s => req(`${BASE}/sales`, { method: 'POST', body: JSON.stringify(s) });
export const fetchCustomers = () => req(`${BASE}/customers`);
export const createCustomer = c => req(`${BASE}/customers`, { method: 'POST', body: JSON.stringify(c) });
export const yearlySales    = () => req(`${BASE}/reports/yearly`);
export const monthlySales   = () => req(`${BASE}/reports/monthly`);
export const ytdSales       = () => req(`${BASE}/reports/ytd`);

