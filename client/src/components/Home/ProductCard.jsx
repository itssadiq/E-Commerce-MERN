import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div className="group relative bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.imageURL}
            alt={product.name}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Badge: Out of Stock or Category */}
        <div className="absolute top-2 left-2">
          {!product.inStock ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Out of Stock
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 opacity-90">
              {product.category}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
              <Link to={`/product/${product._id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              {product.description}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-900">
            ${product.price}
          </p>

          {/* Add to Cart Icon (Optional visual cue) */}
          <button
            disabled={!product.inStock}
            className="z-10 p-2 rounded-full bg-gray-50 text-gray-900 hover:bg-indigo-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Add to Cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
