import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const SweetCard = ({ sweet }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if (!sweet.quantity) return;
        dispatch(addToCart(sweet));
        toast.success(`Added ${sweet.name} to cart!`, {
            duration: 2000,
            icon: '🛒'
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            transition={{ duration: 0.3 }}
            className="card"
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>{sweet.name}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ background: '#f3e8ff', color: 'var(--secondary)', padding: '0.25rem 0.6rem', borderRadius: '1rem', fontSize: '0.8rem', fontWeight: '500' }}>
                    {sweet.category}
                </span>
                <span style={{ fontWeight: '700', fontSize: '1.2rem', color: 'var(--text-main)' }}>${sweet.price}</span>
            </div>

            <p style={{ color: sweet.quantity > 0 ? 'var(--text-muted)' : 'var(--error)', fontSize: '0.875rem' }}>
                Stock: {sweet.quantity > 0 ? sweet.quantity : 'Out of Stock'}
            </p>

            <motion.button
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary"
                onClick={handleAddToCart}
                disabled={sweet.quantity <= 0}
                style={{ marginTop: 'auto', opacity: sweet.quantity <= 0 ? 0.5 : 1, width: '100%' }}
            >
                {sweet.quantity > 0 ? 'Add to Cart' : 'Sold Out'}
            </motion.button>
        </motion.div>
    );
};

export default SweetCard;
