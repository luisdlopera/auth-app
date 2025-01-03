'use client';

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { signOut } from 'next-auth/react'

const DashboardPage = () => {
    return (
        <>
            <Button className='absolute top-14 right-14' onClick={() => signOut()}>
                Log Out
            </Button>
            <div className='absolute top-14 left-14'>
                <Link className='text-3xl font-bold' href='/'>Auth App</Link>
            </div>
            <section className='w-full h-screen flex items-center justify-center'>
                <h1 className='w-full text-center text-5xl font-bold'>Welcome</h1>
            </section>
        </>
    )
}

export default DashboardPage
