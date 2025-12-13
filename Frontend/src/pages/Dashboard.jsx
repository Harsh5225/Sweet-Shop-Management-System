import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SweetCard from '../components/SweetCard';
import SkeletonCard from '../components/SkeletonCard';
import { fetchSweets } from '../store/sweetSlice';
import { logoutUser, reset as resetAuth } from '../store/authSlice';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
    // ... state declarations ...
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
    const { sweets, isLoading } = useSelector((state) => state.sweets);
    const { cartTotalQuantity } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(fetchSweets({ search, category, minPrice, maxPrice }));
    }, [dispatch, search, category, minPrice, maxPrice]);

    const handleLogout = () => {
        dispatch(logoutUser());
        dispatch(resetAuth());
        navigate('/');
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="container" style={{ padding: '2rem 1.5rem' }}>
            {/* ... Header and Search code ... */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}
            >
                <div>
                    <h1 style={{ fontSize: '2.25rem', fontWeight: '800', background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.25rem' }}>
                        Welcome back, {user?.name?.split(' ')[0]}!
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>Ready for some treats?</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {user?.role === 'admin' && (
                        <button onClick={() => navigate('/admin')} className="btn btn-secondary">Admin Panel</button>
                    )}
                    <button onClick={() => navigate('/profile')} className="btn btn-secondary">Profile</button>
                    <button onClick={() => navigate('/cart')} className="btn btn-primary" style={{ position: 'relative', overflow: 'visible' }}>
                        Cart
                        {cartTotalQuantity > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                style={{ position: 'absolute', top: '-6px', right: '-6px', background: 'var(--accent)', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                            >
                                {cartTotalQuantity}
                            </motion.span>
                        )}
                    </button>
                    <button onClick={handleLogout} className="btn btn-secondary" style={{ color: 'var(--text-muted)', border: 'none', background: 'transparent', boxShadow: 'none' }}>Logout</button>
                </div>
            </motion.header>

            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{ marginBottom: '3rem', padding: '1.5rem', background: 'rgba(255,255,255,0.7)', borderRadius: 'var(--radius)', boxShadow: 'var(--glass-shadow)', backdropFilter: 'blur(10px)', border: '1px solid white' }}
            >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <input
                        type="text"
                        className="input"
                        placeholder="🔍 Search sweets..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <input
                        type="text"
                        className="input"
                        placeholder="📁 Category..."
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                            type="number"
                            className="input"
                            placeholder="Min $"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <input
                            type="number"
                            className="input"
                            placeholder="Max $"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                </div>
            </motion.section>

            {isLoading ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <SkeletonCard key={n} />
                    ))}
                </div>
            ) : (
                <>
                    {sweets.length === 0 ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '4rem' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍩</div>
                            No sweets found matching your criteria.
                        </motion.div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}
                        >
                            <AnimatePresence>
                                {sweets.map(sweet => (
                                    <SweetCard key={sweet._id} sweet={sweet} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </>
            )}
        </div>
    );
};

export default Dashboard;
