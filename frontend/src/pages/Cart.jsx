import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState(() => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  });

  const navigate = useNavigate();

  // 1. Calculate running total by multiplying price times quantity
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  // 2. Count absolute item total sum accurately
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // 3. Update quantity directly in the cart
  const updateQuantity = (id, amount) => {
    setCartItems(prevItems => {
      const newItems = prevItems.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + amount;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem('cart', '[]');
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>Your Cart is Empty</h2>
        <p className="lead">Add items from our menu to get started!</p>
        <button className="btn btn-primary" onClick={() => navigate('/menu')}>
          View Menu
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Your Cart</h1>
      <div className="row">
        <div className="col-lg-8">
          {cartItems.map((item) => (
            <div key={item.id} className="card mb-3 shadow-sm">
              <div className="card-body d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div>
                  <h5 className="mb-1">{item.name}</h5>
                  <p className="text-muted small mb-0">${item.price.toFixed(2)} each</p>
                </div>
                
                {/* Quantity Toggle Selectors */}
                <div className="d-flex align-items-center">
                  <div className="btn-group me-4" role="group">
                    <button 
                      className="btn btn-sm btn-outline-secondary px-2" 
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="btn btn-sm btn-light px-3 fw-bold" style={{ pointerEvents: 'none' }}>
                      {item.quantity}
                    </span>
                    <button 
                      className="btn btn-sm btn-outline-secondary px-2" 
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <span className="h5 mb-0 me-4" style={{ minWidth: '80px', textAlign: 'right' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="mb-3">Order Summary</h3>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal ({totalItemsCount} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total</strong>
                <strong className="text-success">${total.toFixed(2)}</strong>
              </div>
              <div className="d-grid gap-2">
                <button className="btn btn-success py-2 fw-bold" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
                <button className="btn btn-sm btn-link text-danger text-decoration-none mt-1" onClick={clearCart}>
                  Clear Entire Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
