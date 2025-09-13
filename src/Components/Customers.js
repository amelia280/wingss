import React, { useEffect, useState } from 'react';
import { fetchCustomers, createCustomer } from '../api/api';

export default function Customers() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  useEffect(() => { fetchCustomers().then(setList); }, []);

  const save = async e => {
    e.preventDefault();
    await createCustomer(form);
    setForm({ name: '', email: '', phone: '' });
    fetchCustomers().then(setList);
  };

  return React.createElement('div', { className: 'card' }, [
  React.createElement('h2', { key: 'h' }, 'Customers'),
  React.createElement('form', { key: 'f', className: 'form-grid', onSubmit: save }, [
    React.createElement('input', { key: 'n', name: 'name', placeholder: 'Name', value: form.name, onChange: e => setForm({ ...form, name: e.target.value }), required: true }),
    React.createElement('input', { key: 'e', name: 'email', placeholder: 'Email', value: form.email, onChange: e => setForm({ ...form, email: e.target.value }), required: true }),
    React.createElement('input', { key: 'p', name: 'phone', placeholder: 'Phone', value: form.phone, onChange: e => setForm({ ...form, phone: e.target.value }) }),
    React.createElement('button', { key: 'btn', type: 'submit', className: 'btn-primary' }, 'Add Customer')
  ]),
  React.createElement('table', { key: 'tbl', className: 'product-table' },
    React.createElement('thead', null,
      React.createElement('tr', null, [
        React.createElement('th', { key: 'n' }, 'Name'),
        React.createElement('th', { key: 'e' }, 'Email'),
        React.createElement('th', { key: 'p' }, 'Phone')
      ])
    ),
    React.createElement('tbody', null,
      (Array.isArray(list) ? list : []).map(c =>
        React.createElement('tr', { key: c.id }, [
          React.createElement('td', null, c.name),
          React.createElement('td', null, c.email),
          React.createElement('td', null, c.phone)
        ])
      )
    )
  )
]);
}