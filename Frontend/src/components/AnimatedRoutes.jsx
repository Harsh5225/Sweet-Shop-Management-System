import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import Dashboard from '../pages/Dashboard';
import AdminPanel from '../pages/AdminPanel'; // Assuming this exists
import ProfilePage from '../pages/ProfilePage'; // Assuming this exists
import CartPage from '../pages/CartPage';
import ProtectedRoute from './ProtectedRoute';

const PageWrapper = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ width: '100%' }}
        >
            {children}
        </motion.div>
    );
};

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {/* Public Routes */}
                <Route path="/" element={<PageWrapper><LandingPage /></PageWrapper>} />
                <Route path="/login" element={<PageWrapper><LoginPage /></PageWrapper>} />
                <Route path="/register" element={<PageWrapper><RegisterPage /></PageWrapper>} />

                {/* Protected Routes */}
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <PageWrapper><Dashboard /></PageWrapper>
                    </ProtectedRoute>
                } />
                <Route path="/cart" element={
                    <ProtectedRoute>
                        <PageWrapper><CartPage /></PageWrapper>
                    </ProtectedRoute>
                } />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <PageWrapper><ProfilePage /></PageWrapper>
                    </ProtectedRoute>
                } />
                <Route path="/admin" element={
                    <ProtectedRoute adminOnly={true}>
                        <PageWrapper><AdminPanel /></PageWrapper>
                    </ProtectedRoute>
                } />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
