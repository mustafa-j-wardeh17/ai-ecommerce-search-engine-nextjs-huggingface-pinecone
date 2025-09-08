'use client'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import { Product } from '@/types/product';
import products from './../app/data/products.json'
const SearchResults = () => {
    const [results, setResults] = useState<Product[]>(products);
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchProducts = async () => {
            const query = searchParams.get('q');
            setLoading(true);
            try {
                const res = await fetch(`/api/search`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ query })
                });
                const data = await res.json();
                setResults(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
            finally {
                setLoading(false);
            }
        }
        const query = searchParams.get('q');
        if (query) {
            fetchProducts();
        } else {
            setResults(products);
        }
    }, [searchParams])

    if (loading) {
        return (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className='animate-pulse rounded-lg border border-gray-100 dark:border-zinc-800 overflow-hidden'>
                        <div className='h-56 w-full bg-gray-200 dark:bg-zinc-800' />
                        <div className='p-5 space-y-3'>
                            <div className='h-5 w-2/3 bg-gray-200 dark:bg-zinc-800 rounded' />
                            <div className='h-4 w-1/2 bg-gray-200 dark:bg-zinc-800 rounded' />
                            <div className='h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded' />
                            <div className='h-4 w-5/6 bg-gray-200 dark:bg-zinc-800 rounded' />
                        </div>
                    </div>
                ))}
            </div>
        )
    }
    if (!results.length) {
        return (
            <div className='text-center text-gray-500 dark:text-gray-400'>
                No results found. Try different keywords or remove filters.
            </div>
        )
    }
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {results.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}

export default SearchResults
