import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import './Pages.css';

const AdminDashboard = () => {
  const { products, updateProduct } = useContext(AppContext);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditForm(product);
  }

  const handleSave = () => {
    updateProduct(editForm);
    setEditingId(null);
  }

  return (
    <div className="page-container admin-container">
      <h1 className="page-title">Admin Dashboard</h1>
      <p className="page-subtitle">Manage product details and prices system-wide.</p>
      <div className="admin-panel glass-panel">
        <h2>Global Product Inventory</h2>
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>
                    {editingId === p.id ? 
                      <input className="edit-input" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} /> 
                      : p.name}
                  </td>
                  <td>
                    {editingId === p.id ? 
                      <input className="edit-input" type="number" value={editForm.price} onChange={e => setEditForm({...editForm, price: parseFloat(e.target.value)})} /> 
                      : `₹${p.price.toFixed(2)}`}
                  </td>
                  <td>
                    {editingId === p.id ? 
                      <input className="edit-input" type="number" value={editForm.stock} onChange={e => setEditForm({...editForm, stock: parseInt(e.target.value)})} /> 
                      : p.stock}
                  </td>
                  <td>
                    {editingId === p.id ? 
                      <button onClick={handleSave} className="action-btn save">Save</button>
                      : <button onClick={() => handleEdit(p)} className="action-btn edit">Edit</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
