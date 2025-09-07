
'use client'
import React from 'react'
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-xl border border-gray-100 flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-56 object-fill object-center"
      />
      <div className="p-5 flex flex-col flex-1">
        <h2 className="text-xl font-semibold mb-1 text-gray-900 truncate">{product.name}</h2>
        <p className="text-gray-500 text-sm mb-2 truncate">{product.brand} &bull; {product.category}</p>
        <p className="text-gray-700 text-base mb-3 line-clamp-2">{product.description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {product.colors.map((color) => (
            <span key={color} className="px-2 py-0.5 rounded-full text-xs border bg-gray-50 text-gray-700 border-gray-200">{color}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {product.features.map((feature) => (
            <span key={feature} className="px-2 py-0.5 rounded text-xs bg-blue-50 text-blue-700 border border-blue-100">{feature}</span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-green-600">${product.price.toFixed(2)}</span>
          <span className={`text-xs font-medium px-2 py-1 rounded ${product.inSock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{product.inSock ? 'In Stock' : 'Out of Stock'}</span>
        </div>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500 mr-1">★</span>
          <span className="text-sm font-medium text-gray-700">{product.rating}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
