import React from 'react';

export default function NavBar({ setPage }) {
  const btn = (label, page) =>
    React.createElement(
      'button',
      {
        onClick: () => setPage(page),
        className: 'mr-4 text-blue-600 hover:underline'
      },
      label
    );

  return React.createElement(
    'nav',
    { className: 'p-4 bg-gray-100 border-b' },
    btn('Dashboard', 'dashboard'),
    btn('Products',  'products'),
    btn('Sales',     'sales'),
    btn('Reports',   'reports')
  );
}