import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const LandingPage = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Navigation */}
            <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 10 }}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ fontSize: '1.75rem', fontWeight: '800', background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.03em' }}
                >
                    SweetShop
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    style={{ display: 'flex', gap: '1rem' }}
                >
                    {user ? (
                        <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-secondary">Login</Link>
                            <Link to="/register" className="btn btn-primary">Get Started</Link>
                        </>
                    )}
                </motion.div>
            </nav>

            {/* Hero Section */}
            <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', position: 'relative' }}>
                {/* Background Blobs */}
                <div style={{ position: 'absolute', top: '10%', left: '10%', width: '300px', height: '300px', background: 'var(--primary)', filter: 'blur(100px)', opacity: 0.2, borderRadius: '50%', zIndex: 0 }} />
                <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '400px', height: '400px', background: 'var(--secondary)', filter: 'blur(100px)', opacity: 0.2, borderRadius: '50%', zIndex: 0 }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ fontSize: '4.5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: 1.1, color: '#1f2937' }}
                    >
                        Indulge in <br />
                        <span style={{ background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Pure Sweetness</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: 1.6 }}
                    >
                        Discover strict quality, handcrafted sweets made with the finest ingredients. From traditional delights to modern treats, we create moments of joy.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}
                    >
                        <Link to={user ? "/dashboard" : "/register"} className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 3rem', boxShadow: '0 20px 25px -5px rgba(217, 70, 239, 0.3)' }}>{user ? 'View Sweets' : 'Browse Sweets'}</Link>
                    </motion.div>

                    {/* Decorative Elements */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        style={{ marginTop: '5rem', display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}
                    >
                        {['Donuts', 'Macarons', 'Chocolates'].map((item, index) => (
                            <motion.div
                                key={item}
                                whileHover={{ y: -10, rotate: index % 2 === 0 ? 2 : -2 }}
                                className="card"
                                style={{ width: '160px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem' }}
                            >
                                <div style={{ width: '50px', height: '50px', background: index === 0 ? '#fce7f3' : index === 1 ? '#ede9fe' : '#fff7ed', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                                    {index === 0 ? '🍩' : index === 1 ? '🍪' : '🍫'}
                                </div>
                                <span style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-main)' }}>{item}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;
