
'use client'
import React from 'react'
import { Product } from "@/types/product";
import Image from 'next/image'

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg border border-gray-100 dark:border-zinc-800 flex flex-col">
      <div className="relative w-full aspect-[4/3] bg-gray-100 dark:bg-zinc-800">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain object-center"
          priority={false}
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h2 className="text-xl font-semibold mb-1 text-gray-900 dark:text-gray-100 truncate">{product.name}</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-2 truncate">{product.brand} &bull; {product.category}</p>
        <p className="text-gray-700 dark:text-gray-300 text-base mb-3 line-clamp-2">{product.description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {product.colors.map((color) => (
            <span key={color} className="px-2 py-0.5 rounded-full text-xs border bg-gray-50 text-gray-700 border-gray-200 dark:bg-zinc-800 dark:text-gray-200 dark:border-zinc-700">{color}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {product.features.map((feature) => (
            <span key={feature} className="px-2 py-0.5 rounded text-xs bg-blue-50 text-blue-700 border border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-900/50">{feature}</span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-green-600 dark:text-green-400">${product.price.toFixed(2)}</span>
          <span className={`text-xs font-medium px-2 py-1 rounded ${product.inSock ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>{product.inSock ? 'In Stock' : 'Out of Stock'}</span>
        </div>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500 mr-1">★</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{product.rating}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
