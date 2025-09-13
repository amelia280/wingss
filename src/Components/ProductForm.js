import React, { useState } from 'react';
import { createProduct } from '../api/api';

export default function ProductForm({ onAdd }) {
  const [f, setF] = useState({ name: '', description: '', category: '', price: '', quantity: '' });
  const ch = e => setF({ ...f, [e.target.name]: e.target.value });

  const save = async e => {
    e.preventDefault();
    await createProduct({ ...f, price: +f.price, quantity: +f.quantity });
    setF({ name: '', description: '', category: '', price: '', quantity: '' });
    onAdd();
  };

  return React.createElement('form', { className: 'form-grid', onSubmit: save }, [
    React.createElement('input', { key: 'n', name: 'name', placeholder: 'Name', value: f.name, onChange: ch, required: true }),
    React.createElement('input', { key: 'd', name: 'description', placeholder: 'Description', value: f.description, onChange: ch, required: true }),
    React.createElement('input', { key: 'c', name: 'category', placeholder: 'Category', value: f.category, onChange: ch, required: true }),
    React.createElement('input', { key: 'p', name: 'price', type: 'number', step: '0.01', placeholder: 'Price', value: f.price, onChange: ch, required: true }),
    React.createElement('input', { key: 'q', name: 'quantity', type: 'number', placeholder: 'Quantity', value: f.quantity, onChange: ch, required: true }),
    React.createElement('button', { key: 'btn', type: 'submit', className: 'btn-primary' }, 'Add Product')
  ]);
}