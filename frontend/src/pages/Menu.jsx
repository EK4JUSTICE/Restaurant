import { useState, useEffect } from 'react';
import { menuService } from '../services/api';

const fetchMenuItems = async () => {
  try {
    const response = await menuService.getMenuItems();
    return { items: response.data, error: null };
  } catch {
    return {
      items: [
        { id: 1, name: 'Margherita Pizza', description: 'Fresh tomatoes, mozzarella, basil', price: 12.99, category: 'mains', image: '/pizza.jpg' },
        { id: 2, name: 'Caesar Salad', description: 'Romaine, parmesan, croutons', price: 8.99, category: 'starters', image: '/salad.jpg' },
        { id: 3, name: 'Tiramisu', description: 'Classic Italian dessert', price: 6.99, category: 'desserts', image: '/tiramisu.jpg' },
        { id: 4, name: 'Cola', description: 'Refreshing soft drink', price: 2.99, category: 'drinks', image: '/cola.jpg' },
      ],
      error: 'Failed to load menu items from backend server. Showing sample items.'
    };
  }
};

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetchMenuItems().then(({ items, error }) => {
      setMenuItems(items);
      setErrorMessage(error);
      setLoading(false);
    });
  }, []);

  const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];
  
  // Safe comparison by handling empty fields and lowercase strings
  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category?.toLowerCase() === activeCategory.toLowerCase());

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if the exact product already sits inside the array bucket
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex > -1) {
      // Increment the quantity item counter safely
      cart[existingItemIndex].quantity += 1;
    } else {
      // Append item with an initialization counter value of 1
      cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item.name} added to cart!`);
  };

  if (loading) return <div className="text-center py-5">Loading menu...</div>;

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Our Menu</h1>
      {errorMessage && <div className="alert alert-warning text-center mb-4">{errorMessage}</div>}
      
      <div className="text-center mb-4">
        {categories.map(cat => (
          <button
            key={cat}
            className={`btn mx-1 ${activeCategory === cat ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="row g-4">
        {filteredItems.map(item => (
          <div key={item.id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <img 
                src={item.image || 'https://via.placeholder.com/300'} 
                className="card-img-top" 
                alt={item.name} 
                style={{ height: '220px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text text-muted flex-grow-1">{item.description}</p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="h5 mb-0 text-success">${item.price.toFixed(2)}</span>
                  <button className="btn btn-success" onClick={() => addToCart(item)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
