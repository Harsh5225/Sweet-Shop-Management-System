import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser, reset } from '../store/authSlice';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logoutUser());
        dispatch(reset());
        navigate('/');
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <button onClick={() => navigate('/dashboard')} className="btn btn-secondary" style={{ marginBottom: '1rem' }}>&larr; Back to Dashboard</button>
            <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h1 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>My Profile</h1>

                <div style={{ display: 'grid', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                        <span style={{ fontWeight: '500', color: 'var(--text-muted)' }}>Name</span>
                        <span style={{ fontWeight: 'bold' }}>{user.name}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                        <span style={{ fontWeight: '500', color: 'var(--text-muted)' }}>Email</span>
                        <span>{user.email}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                        <span style={{ fontWeight: '500', color: 'var(--text-muted)' }}>Role</span>
                        <span style={{ textTransform: 'capitalize' }}>{user.role}</span>
                    </div>
                </div>

                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <button onClick={handleLogout} className="btn btn-primary" style={{ background: 'var(--error)' }}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
