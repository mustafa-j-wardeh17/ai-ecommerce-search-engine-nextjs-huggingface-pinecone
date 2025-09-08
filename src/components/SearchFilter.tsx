'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoIosSearch } from 'react-icons/io'

const SearchFilter = () => {
    const router = useRouter();
    const handleSearch = (e:React.FormEvent)=>{
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);
        const query = form.get('q')?.toString().trim() || '';
        if(query){
            router.push(`/?q=${encodeURIComponent(query)}`);
        } else {
            router.push('/');
        }
    }
    return (
        <form onSubmit={handleSearch} className='w-full' role="search" aria-label="Product search">
            <div className='relative mb-5 flex items-stretch'>
                <div className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                    <IoIosSearch className='h-5 w-5'/>
                </div>
                <input
                    type="text"
                    id="search"
                    name='q'
                    className='w-full rounded-l-md border border-gray-300 bg-white/90 pl-10 pr-3 py-2 text-base outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 dark:border-gray-700 dark:bg-black/40'
                    placeholder="Search for products (e.g. ‘running shoes’)"
                    autoComplete="off"
                    aria-label="Search products"
                />
                <button type='submit' className='inline-flex items-center justify-center px-4 py-2 rounded-r-md border border-l-0 border-blue-600 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 active:bg-blue-800'>
                    Search
                </button>
            </div>
        </form>
    )
}

export default SearchFilter
