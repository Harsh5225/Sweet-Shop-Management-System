const Footer = () => {
    return (
        <footer style={{
            marginTop: 'auto',
            padding: '2rem',
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.5)',
            color: 'var(--text-muted)',
            fontSize: '0.9rem'
        }}>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--primary)' }}>SweetShop</div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>About</a>
                    <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a>
                    <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
                    <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a>
                </div>
                <div>
                    &copy; {new Date().getFullYear()} Sweet Shop Management System. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
