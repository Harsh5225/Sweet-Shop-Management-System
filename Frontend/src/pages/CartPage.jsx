import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, decreaseCart, addToCart, clearCart, getTotals } from '../store/cartSlice';
import { purchaseSweet } from '../store/sweetSlice';

const CartPage = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!cart) {
        return <div className="container" style={{ padding: '2rem 1rem' }}>Loading Cart...</div>;
    }



    const handleRemove = (cartItem) => {
        dispatch(removeFromCart(cartItem._id));
    };

    const handleDecrease = (cartItem) => {
        dispatch(decreaseCart(cartItem._id));
    };

    const handleIncrease = (cartItem) => {
        // Here we could check stock limit but standard increment
        dispatch(addToCart(cartItem));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleCheckout = async () => {
        try {
            // Process each item purchase
            // Ideally backend should have bulk purchase, but reusing purchaseSweet per item for now
            // or we could assume the user wants to buy all.
            // Using a loop for MVP simplicity as per request
            for (const item of cart.cartItems) {
                await dispatch(purchaseSweet({ id: item._id, quantity: item.cartQuantity })).unwrap();
            }
            alert("Checkout Successful!");
            dispatch(clearCart());
            navigate('/dashboard');
        } catch (error) {
            alert("Checkout Failed: " + (error.message || error));
        }
    };

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Shopping Cart</h2>

            {cart.cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                    <p>Your cart is currently empty.</p>
                    <button onClick={() => navigate('/dashboard')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="card">
                    {cart.cartItems.map((cartItem) => (
                        <div key={cartItem._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{cartItem.name}</h3>
                                <p style={{ color: 'var(--text-muted)' }}>{cartItem.category}</p>
                                <button onClick={() => handleRemove(cartItem)} style={{ color: 'var(--error)', fontSize: '0.875rem', marginTop: '0.5rem', textDecoration: 'underline' }}>Remove</button>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '0.25rem' }}>
                                    <button onClick={() => handleDecrease(cartItem)} style={{ padding: '0.25rem 0.5rem' }}>-</button>
                                    <span style={{ padding: '0.25rem 0.5rem', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>{cartItem.cartQuantity}</span>
                                    <button onClick={() => handleIncrease(cartItem)} style={{ padding: '0.25rem 0.5rem' }}>+</button>
                                </div>
                                <div style={{ fontWeight: 'bold', minWidth: '80px', textAlign: 'right' }}>
                                    ${cartItem.price * cartItem.cartQuantity}
                                </div>
                            </div>
                        </div>
                    ))}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
                        <button onClick={handleClearCart} className="btn btn-secondary">Clear Cart</button>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                Total: ${cart.cartTotalAmount}
                            </div>
                            <button onClick={handleCheckout} className="btn btn-primary">Purchase All</button>
                        </div>
                    </div>
                </div>
            )}
            <button onClick={() => navigate('/dashboard')} className="btn btn-secondary" style={{ marginTop: '1rem' }}>&larr; Continue Shopping</button>
        </div>
    );
};

export default CartPage;
