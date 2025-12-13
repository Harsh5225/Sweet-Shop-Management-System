import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, reset } from '../../store/authSlice';
import { motion } from 'framer-motion';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            // Error displayed in UI
        }
        if (isSuccess || user) {
            navigate('/dashboard');
        }
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            {/* Background elements */}
            <div style={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400, background: 'var(--primary)', opacity: 0.1, borderRadius: '50%', filter: 'blur(80px)' }} />
            <div style={{ position: 'absolute', bottom: -100, right: -100, width: 400, height: 400, background: 'var(--secondary)', opacity: 0.1, borderRadius: '50%', filter: 'blur(80px)' }} />

            <Link to="/" style={{ position: 'absolute', top: '2rem', left: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', color: 'var(--primary)' }}>
                &larr; Back to Home
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card"
                style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem', background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Welcome Back</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Sign in to satisfy your cravings</p>
                </div>

                {isError && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ background: '#fee2e2', color: '#ef4444', padding: '0.75rem', borderRadius: 'var(--radius)', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.9rem', border: '1px solid #fca5a5' }}
                    >
                        {message}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-main)' }}>Email</label>
                        <input
                            type="email"
                            className="input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-main)' }}>Password</label>
                        <input
                            type="password"
                            className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="btn btn-primary"
                        style={{ marginTop: '0.5rem', width: '100%', fontSize: '1rem', padding: '0.875rem' }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </motion.button>
                </form>
                <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Sign up</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
