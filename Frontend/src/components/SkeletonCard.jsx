import { motion } from 'framer-motion';

const SkeletonCard = () => {
    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
            <div className="skeleton" style={{ height: '30px', width: '70%', borderRadius: '8px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="skeleton" style={{ height: '20px', width: '30%', borderRadius: '12px' }} />
                <div className="skeleton" style={{ height: '20px', width: '20%', borderRadius: '8px' }} />
            </div>
            <div className="skeleton" style={{ height: '20px', width: '40%', marginTop: 'auto' }} />
            <div className="skeleton" style={{ height: '40px', width: '100%', borderRadius: '20px', marginTop: '1rem' }} />
        </div>
    );
};

export default SkeletonCard;
