'use client'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';

const SearchResults = () => {
    const [results, setResults] = useState([]);
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
            setResults([]);
        }
    }, [searchParams])

    if (!results.length && !loading) {
        return <div className='text-center text-gray-500'>No results found. Please enter a search query.</div>
    }
    else if (loading) {
        return <div className='text-center text-gray-500'>Loading...</div>
    }
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {results.map((product: any) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}

export default SearchResults
