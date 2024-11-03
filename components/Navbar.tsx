"use client"

import useCart from '@/lib/hooks/useCart'
import { UserButton, useUser } from '@clerk/nextjs'
import { CircleUserRound, LucideMenu, Search, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { use, useState } from 'react'

const Navbar = () => {
const pathname = usePathname()
const { user } = useUser();
const cart = useCart()
const router = useRouter()

const [dropdownMenu, setDropdownMenu] = useState(false);
const [query, setQuery] = useState("")

  return (
    <div className='sticky top-0 z-50 py-2 px-10 flex gap-2 justify-between items-center backdrop-blur-md bg-cream/50 max-sm:px-2'>
      <Link href="/">
        <Image src="/logo.png" alt='logo' width={200} height={100} />
      </Link>

      <div className='flex gap-4 text-base-bold max-lg:hidden' >
        <Link href="/" className={`hover:text-amber-500 ${pathname === "/" && "text-amber-500"}`}>Home</Link>
        <Link href={user ? "/wishlist" : "sign-in"} className={`hover:text-amber-500 ${pathname === "/wishlist" && "text-amber-500"}`}>Wishlist</Link>
        <Link href={user ? "/orders" : "sign-in"} className={`hover:text-amber-500 ${pathname === "/orders" && "text-amber-500"}`}>Orders</Link>
      </div>

      <div className='flex gap-3 border-gray-400 px-3 py-1 items-center rounded-lg'>
        <input className='outline-none max-sm:max-w-[120px]' placeholder='Search...' value={query} onChange={(e) => setQuery(e.target.value)}/>
        <button disabled={query === ""} onClick={() => router.push(`/search/${query}`)} >
          <Search  className='cursor-pointer h-4 w-4 hover:text-amber-500'/>
        </button>
      </div>

      <div className='relative flex gap-3 items-center' >
        <Link href="/cart" className='flex items-center gap-3 border rounded-lg px-2 py-1  hover:text-white hover:bg-black max-md:hidden'> 
          <ShoppingCart /> 
          <p className='text-base-bold'> Cart ({cart.cartItems.length})</p>
        </Link>

        <LucideMenu className='cursor-pointer lg:hidden' onClick={() => setDropdownMenu(!dropdownMenu) }/>

        {dropdownMenu && (
            <div className='absolute top-12 right-5 flex flex-col gap-4 p-3 rounded-lg border bg-white text-base-bold lg:hidden' >
              <Link href="/" className='hover:text-amber-500'>Home</Link>
              <Link href={user ? "/wishlist" : "sign-in"} className='hover:text-amber-500'>Wishlist</Link>
              <Link href={user ? "/orders" : "sign-in"} className='hover:text-amber-500'>Orders</Link>

              <Link href="/cart" className='flex items-center gap-3 border rounded-lg px-2 py-1  hover:text-white hover:bg-black'> 
                <ShoppingCart /> 
                <p className='text-base-bold'> Cart ({cart.cartItems.length})</p>
              </Link>
            </div>
        )}

        {user ? (
            <UserButton />
        ) : (
            <Link href="/sign-in" >
                <CircleUserRound />
            </Link>)}
      </div>
    </div>
  )
}

export default Navbar