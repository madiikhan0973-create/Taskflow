import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm]         = useState({ name: '', description: '', deadline: '' });
  const [showForm, setShowForm] = useState(false);
  const [error, setError]       = useState('');

  const fetchProjects = async () => {
    const { data } = await axios.get(`${API}/projects`);
    setProjects(data);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/projects`, form);
      setForm({ name: '', description: '', deadline: '' });
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create project');
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    await axios.delete(`${API}/projects/${id}`);
    fetchProjects();
  };

  const statusColor = { active: '#10b981', completed: '#3b82f6', archived: '#6b7280' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0, color: '#1a1a2e' }}>My Projects</h2>
        <button onClick={() => setShowForm(!showForm)} style={btnStyle('#0f3460')}>
          {showForm ? 'Cancel' : '+ New Project'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={cardStyle}>
          <h3 style={{ marginTop: 0 }}>Create Project</h3>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <input required placeholder="Project name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
          <textarea placeholder="Description (optional)" value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
          <input type="date" value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })} style={inputStyle} />
          <button type="submit" style={btnStyle('#e94560')}>Create</button>
        </form>
      )}

      {projects.length === 0 ? (
        <p style={{ color: '#6b7280', textAlign: 'center', marginTop: 60 }}>
          No projects yet. Create your first project!
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: 16 }}>
          {projects.map((p) => (
            <div key={p._id} style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: statusColor[p.status], fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: 1 }}>{p.status}</span>
                <button onClick={() => deleteProject(p._id)}
                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 16 }}>
                  ×
                </button>
              </div>
              <h3 style={{ margin: '8px 0 4px', color: '#1a1a2e' }}>{p.name}</h3>
              <p style={{ color: '#6b7280', fontSize: 13, margin: '0 0 12px' }}>{p.description}</p>
              {p.deadline && (
                <p style={{ fontSize: 12, color: '#6b7280', margin: '0 0 12px' }}>
                  📅 {new Date(p.deadline).toLocaleDateString()}
                </p>
              )}
              <Link to={`/project/${p._id}`} style={{ ...btnStyle('#0f3460'), display: 'inline-block',
                textDecoration: 'none', fontSize: 13 }}>
                View Tasks →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const cardStyle  = { background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 10px rgba(0,0,0,0.08)', marginBottom: 16 };
const inputStyle = { display: 'block', width: '100%', padding: '10px 12px', marginBottom: 12, borderRadius: 8,
  border: '1px solid #e5e7eb', fontSize: 14, boxSizing: 'border-box' };
const btnStyle   = (bg) => ({ background: bg, color: '#fff', border: 'none', borderRadius: 8,
  padding: '10px 18px', cursor: 'pointer', fontWeight: 600, fontSize: 14 });

export default Dashboard;
