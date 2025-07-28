import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Filters from './components/Filters';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';
import { products } from './data/products';
import { useCart } from './hooks/useCart';
import { debounce } from './utils/helpers';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState('products');
  const [orderDetails, setOrderDetails] = useState(null);

  const {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    toggleCart,
    setIsCartOpen
  } = useCart();

  // Debounced search function
  const debouncedSearch = useMemo(
    () => debounce((query) => setSearchQuery(query), 300),
    []
  );

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  const handleAddToCart = (product) => {
    addToCart(product);
    // Show a brief success animation or notification
    const button = event.target;
    button.textContent = 'Added!';
    button.classList.add('bg-green-600');
    setTimeout(() => {
      button.textContent = 'Add to Cart';
      button.classList.remove('bg-green-600');
    }, 1000);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage('checkout');
  };

  const handleOrderComplete = () => {
    setOrderDetails({
      items: [...cartItems],
      total: getCartTotal()
    });
    clearCart();
    setCurrentPage('success');
  };

  const handleContinueShopping = () => {
    setCurrentPage('products');
    setOrderDetails(null);
  };

  const handleBackToCart = () => {
    setCurrentPage('products');
    setIsCartOpen(true);
  };

  // Render different pages
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'checkout':
        return (
          <Checkout
            cartItems={cartItems}
            cartTotal={getCartTotal()}
            onBack={handleBackToCart}
            onOrderComplete={handleOrderComplete}
          />
        );
      case 'success':
        return (
          <OrderSuccess
            orderDetails={orderDetails}
            onContinueShopping={handleContinueShopping}
          />
        );
      case 'products':
      default:
        return (
          <>
            <Filters
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
            
            <ProductGrid
              products={filteredProducts}
              onAddToCart={handleAddToCart}
              viewMode={viewMode}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {currentPage === 'products' && (
        <Header
          onSearch={debouncedSearch}
          cartItemsCount={getCartItemsCount()}
          onToggleCart={toggleCart}
          searchQuery={searchQuery}
        />
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentPage()}
      </main>

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        cartTotal={getCartTotal()}
        onCheckout={handleCheckout}
      />

      {/* Footer */}
      {currentPage === 'products' && (
        <footer className="bg-white border-t mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">ShopHub</h3>
                <p className="text-gray-600">Your one-stop destination for quality products at great prices.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Customer Service</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Contact Us</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">FAQ</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Shipping Info</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Returns</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">About Us</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Careers</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Press</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Blog</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Connect</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Newsletter</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Social Media</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Community</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t mt-8 pt-8 text-center text-gray-600">
              <p>&copy; 2024 ShopHub. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;