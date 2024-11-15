import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const HomePage = () => {
	return (
		<div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-purple-600'>
			<Card className='w-full max-w-md'>
				<CardHeader className='text-center'>
					<CardTitle className='text-3xl font-bold'>Welcome to Auth App</CardTitle>
					<CardDescription> With next js, postgresql and other technologies</CardDescription>
				</CardHeader>
				<CardContent className='space-y-6'>
					
					<div className='flex flex-col space-y-4'>
						<Button asChild>
							<Link href='/auth/login'>Login</Link>
						</Button>
						<Button asChild variant='outline'>
							<Link href='/auth/register'>Register</Link>
						</Button>
					</div>
					<div className='text-center text-sm text-muted-foreground'>
						<p>you can explore the documentation in github</p>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

export default HomePage
