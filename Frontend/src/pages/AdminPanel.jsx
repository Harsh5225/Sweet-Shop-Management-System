import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSweets, createSweet, updateSweet, deleteSweet } from '../store/sweetSlice';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { sweets } = useSelector((state) => state.sweets);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSweet, setEditingSweet] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: '', price: '', quantity: '' });

  useEffect(() => {
    dispatch(fetchSweets());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this sweet?')) return;
    try {
      await dispatch(deleteSweet(id)).unwrap();
    } catch (error) {
      alert('Failed to delete sweet');
    }
  };

  const handleEdit = (sweet) => {
    setEditingSweet(sweet);
    setFormData({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity
    });
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingSweet(null);
    setFormData({ name: '', category: '', price: '', quantity: '' });
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSweet) {
        await dispatch(updateSweet({ id: editingSweet._id, sweetData: formData })).unwrap();
      } else {
        await dispatch(createSweet(formData)).unwrap();
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error("Operation failed", error);
      alert('Operation failed: ' + (error.message || error));
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--primary)' }}>Admin Panel</h1>
        <div>
          <button onClick={() => navigate('/dashboard')} className="btn btn-secondary" style={{ marginRight: '1rem' }}>Back to Dashboard</button>
          <button onClick={handleAddNew} className="btn btn-primary">+ Add New Sweet</button>
        </div>
      </div>

      {isFormOpen && (
        <div className="card" style={{ marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>{editingSweet ? 'Edit Sweet' : 'Add New Sweet'}</h2>
          <form onSubmit={handleFormSubmit} style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Name</label>
              <input
                className="input"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Category</label>
              <input
                className="input"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                required
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Price</label>
                <input
                  type="number"
                  className="input"
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Quantity</label>
                <input
                  type="number"
                  className="input"
                  value={formData.quantity}
                  onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                  required
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
              <button type="button" onClick={() => setIsFormOpen(false)} className="btn btn-secondary">Cancel</button>
              <button type="submit" className="btn btn-primary">{editingSweet ? 'Update' : 'Create'}</button>
            </div>
          </form>
        </div>
      )}

      <div className="card" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
          <thead>
            <tr style={{ background: '#f9fafb', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>Name</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>Category</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>Price</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>Stock</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sweets.map(sweet => (
              <tr key={sweet._id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '0.75rem' }}>{sweet.name}</td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{ background: '#f3e8ff', color: 'var(--secondary)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem' }}>
                    {sweet.category}
                  </span>
                </td>
                <td style={{ padding: '0.75rem' }}>${sweet.price}</td>
                <td style={{ padding: '0.75rem' }}>{sweet.quantity}</td>
                <td style={{ padding: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => handleEdit(sweet)} style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Edit</button>
                  <button onClick={() => handleDelete(sweet._id)} style={{ color: 'var(--error)', fontWeight: '500' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
