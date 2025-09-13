import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../api/api';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const load = () => fetchProducts().then(setProducts);
  useEffect(load, []);

  const remove = id => {
    if (window.confirm('Delete this product?'))
      deleteProduct(id).then(load);
  };

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Name</th><th>Category</th><th>Price</th><th>Qty</th><th></th>
        </tr>
      </thead>
      <tbody>
        {products.map(p => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{p.category}</td>
            <td>${p.price}</td>
            <td>{p.quantity}</td>
            <td>
              <button className="del" onClick={() => remove(p.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}