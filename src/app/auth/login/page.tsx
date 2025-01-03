import React from 'react'
import Link from 'next/link'
import { LoginForm } from '@/components/form/export'
import { Button } from '@/components/ui/button'


const LoginPage = () => {
	return (

		<div className='w-4/5 lg:w-1/3 h-screen mx-auto flex justify-center items-center flex-col gap-5'>
			<Button className='absolute top-14 right-14'>
				<Link href='/auth/register'>Register</Link>
			</Button>
			<div className='absolute top-14 left-14'>
				<Link className='text-3xl font-bold' href='/'>Auth App</Link>
            </div>
			<LoginForm />
		</div>

	)
}

export default LoginPage
