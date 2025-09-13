import React, { useEffect, useState } from 'react';
import { fetchSales, createSale, fetchProducts } from '../api/api';

export default function Sales() {
  const [products, setProducts] = useState([]);
  const [sales, setSales]       = useState([]);
  const [cart, setCart]         = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
    fetchSales().then(setSales);
  }, []);

  const addToCart = p =>
    setCart([...cart, { productId: p.id, name: p.name, price: p.price, qty: 1 }]);

  const changeQty = (i, q) =>
    setCart(cart.map((it, idx) => idx === i ? { ...it, qty: +q } : it));

  const remove = i => setCart(cart.filter((_, idx) => idx !== i));

  const total = cart.reduce((t, it) => t + it.price * it.qty, 0);

  const save = async e => {
    e.preventDefault();
    if (!cart.length) return alert('Cart empty');
    await createSale({ items: cart, total });
    setCart([]);
    fetchSales().then(setSales); // refresh list
  };

  return React.createElement('div', { className: 'card' }, [
    React.createElement('h2', { key: 'h' }, 'New Sale'),
    React.createElement('div', { key: 'grid', className: 'form-grid' },
      products.map(p =>
        React.createElement('button', {
          key: p.id,
          className: 'btn-secondary',
          onClick: () => addToCart(p)
        }, `Add ${p.name}`)
      )
    ),
    cart.length
      ? React.createElement('table', { key: 'tbl', className: 'product-table' }, [
          React.createElement('thead', { key: 'hd' },
            React.createElement('tr', null, [
              React.createElement('th', { key: 'n' }, 'Item'),
              React.createElement('th', { key: 'p' }, 'Price'),
              React.createElement('th', { key: 'q' }, 'Qty'),
              React.createElement('th', { key: 'x' }, '')
            ])
          ),
          React.createElement('tbody', { key: 'bd' },
            cart.map((it, i) =>
              React.createElement('tr', { key: i }, [
                React.createElement('td', { key: 'n' }, it.name),
                React.createElement('td', { key: 'p' }, `$${it.price}`),
                React.createElement('td', { key: 'q' },
                  React.createElement('input', {
                    type: 'number', min: 1, value: it.qty,
                    onChange: e => changeQty(i, e.target.value)
                  })
                ),
                React.createElement('td', { key: 'x' },
                  React.createElement('button', { className: 'btn-icon', onClick: () => remove(i) }, '🗑')
                )
              ])
            )
          )
        ])
      : null,
    React.createElement('div', { key: 'tot', className: 'sale-total' }, `Total: $${total.toFixed(2)}`),
    React.createElement('button', { key: 'save', className: 'btn-primary', onClick: save }, 'Complete Sale'),

    React.createElement('h3', { key: 'h2', style: { marginTop: '2rem' } }, 'Today’s Sales'),
    React.createElement('table', { key: 'lst', className: 'product-table' },
      React.createElement('thead', null,
        React.createElement('tr', null, [
          React.createElement('th', { key: 'd' }, 'Date'),
          React.createElement('th', { key: 't' }, 'Total')
        ])
      ),
      React.createElement('tbody', null,
        sales.slice(-10).reverse().map(s =>
          React.createElement('tr', { key: s.id }, [
            React.createElement('td', null, new Date(s.date).toLocaleString()),
            React.createElement('td', null, `$${s.total.toFixed(2)}`)
          ])
        )
      )
    )
  ]);
}