import { ShoppingCart, Star } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const ProductCard = ({ product, onAddToCart, viewMode }) => {
  const isListView = viewMode === 'list';

  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${isListView ? 'flex' : ''}`}>
      {/* Product Image */}
      <div className={`relative overflow-hidden ${isListView ? 'w-48 flex-shrink-0' : 'aspect-square'} rounded-t-xl ${isListView ? 'rounded-l-xl rounded-t-none' : ''}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className={`p-6 ${isListView ? 'flex-1' : ''}`}>
        <div className={`${isListView ? 'flex justify-between items-start' : ''}`}>
          <div className={`${isListView ? 'flex-1 pr-6' : ''}`}>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {product.name}
            </h3>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center mb-3">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-2">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Category */}
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full mb-4">
              {product.category}
            </span>
          </div>

          {/* Price and Add to Cart */}
          <div className={`${isListView ? 'flex flex-col items-end' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-blue-600">
                {formatCurrency(product.price)}
              </span>
            </div>

            <button
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                product.inStock
                  ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              } ${isListView ? 'w-auto px-6' : ''}`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;