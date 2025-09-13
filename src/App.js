import React from 'react';
import Dashboard from './Components/Dashboard';
import ProductForm from './Components/ProductForm';
import ProductList from './Components/ProductList';
import Sales from './Components/Sales';
import Reports from './Components/Reports';
import Customers from './Components/Customers';

export default function App() {
  // 🔹 Detect if redirected from 404.html
  let page = new URLSearchParams(window.location.search).get("redirect");

  // If no redirect, use path or fallback to dashboard
  if (!page) {
    page = window.location.pathname.replace("/wings-cafe-inventory", "").replace(/^\//, "");
  }
  if (!page || page === "") {
    page = "dashboard";
  }

  return React.createElement('div', { className: 'app' }, [
    React.createElement('header', { key: 'hdr', className: 'header' }, [
      React.createElement('h1', { key: 'logo' }, 'Wings Café Inventory'),
      React.createElement('span', { key: 'user', className: 'user' }, 'Manager'),
      React.createElement('div', { key: 'links', className: 'header-links' }, [
        React.createElement('a', { key: 'd', href: '/wings-cafe-inventory/' }, 'Dashboard'),
        React.createElement('a', { key: 'p', href: '/wings-cafe-inventory/products' }, 'Products'),
        React.createElement('a', { key: 's', href: '/wings-cafe-inventory/sales' }, 'Sales'),
        React.createElement('a', { key: 'r', href: '/wings-cafe-inventory/reports' }, 'Reports'),
        React.createElement('a', { key: 'c', href: '/wings-cafe-inventory/customers' }, 'Customers')
      ])
    ]),

    page === 'dashboard' && React.createElement(Dashboard, { key: 'dash' }),
    page === 'products' && React.createElement('div', { key: 'prod', className: 'card' }, [
      React.createElement('h2', { key: 'h' }, 'Products'),
      React.createElement(ProductForm, { key: 'form', onAdd: () => window.location.reload() }),
      React.createElement(ProductList, { key: 'list' })
    ]),
    page === 'sales' && React.createElement(Sales, { key: 'sales' }),
    page === 'reports' && React.createElement(Reports, { key: 'rep' }),
    page === 'customers' && React.createElement(Customers, { key: 'cust' })
  ]);
}
