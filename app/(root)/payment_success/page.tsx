"use client"
import useCart from '@/lib/hooks/useCart'
import Link from 'next/link'
import React, { useEffect } from 'react'

const paymentSuccess = () => {
const cart = useCart();

useEffect(() => {
    cart.clearCart()
}, [])

  return (
    <div className='h-screen flex flex-col justify-center items-center gap-5'>
        <p className='text-heading4-bold text-blue-600'>Payment Successful</p>
        <p>Thank you for Purchasing</p>
        <Link href="/" className='p-4 border text-base-bold hover:bg-black hover:text-white' >Continue Shopping</Link>
    </div>
  )
}

export const dynamic = "force-dynamic";

export default paymentSuccess