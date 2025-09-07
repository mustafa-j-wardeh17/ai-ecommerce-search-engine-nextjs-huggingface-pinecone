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
        <form onSubmit={handleSearch} className='w-full max-w-2xl mx-auto'>
            <div className='relative mb-5'>
                <input
                    type="text"
                    id="search"
                    name='q'
                    className='w-full rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-base px-8 py-2'
                    placeholder="Search for products (e.g 'running shoes')"
                />
                <IoIosSearch className='absolute left-2 top-1/2 transform translate-y-[-50%] h-5 w-5  text-gray-400'/>

            </div>
        </form>
    )
}

export default SearchFilter
