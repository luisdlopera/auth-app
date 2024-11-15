import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const DashboardPage = () => {
    return (
        <div>
            <Button className='absolute top-14 right-14'>
                <Link href='/auth/login'>Log Out</Link>
            </Button>
            <div className='absolute top-14 left-14'>
                <Link className='text-3xl font-bold' href='/'>Auth App</Link>
            </div>
        </div>
    )
}

export default DashboardPage
