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
            <div className='relative mb-5 flex items-stretch rounded-md border border-gray-300 dark:border-gray-700 overflow-hidden focus-within:ring-2 focus-within:ring-blue-200 focus-within:border-blue-500'>
                <div className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                    <IoIosSearch className='h-5 w-5'/>
                </div>
                <input
                    type="text"
                    id="search"
                    name='q'
                    className='w-full h-11 border-0 bg-white/90 pl-10 pr-3 text-base outline-none dark:bg-black/40'
                    placeholder="Search for products (e.g. ‘running shoes’)"
                    autoComplete="off"
                    aria-label="Search products"
                />
                <button type='submit' className='inline-flex h-11 items-center justify-center px-4 border-0 border-l border-gray-300 dark:border-gray-700 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none active:bg-blue-800'>
                    Search
                </button>
            </div>
        </form>
    )
}

export default SearchFilter
