'use client'

import Image from 'next/image';
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { EyeIcon, EyeOffIcon, GithubIcon } from 'lucide-react';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { signIn } from 'next-auth/react'
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    email: z.string()
        .min(2, { message: 'Username must be at least 2 characters.' })
        .email({ message: 'Invalid email address.' }),
    password: z.string()
        .min(6, { message: 'Password must be at least 6 characters.' })
});

const LoginForm = () => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const Router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        const response = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        })
        console.log(response)
        
        if (!response) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'No response from the server.',
            });
            return;
        }
    
        if (response.error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Invalid credentials',
            });
            return;
        } else {
            toast({
                variant: 'default',
                title: 'Success',
                description: 'You have successfully logged in.',
            });
            Router.push('/dashboard')
        }
    
        console.log(response)
    }

    return (
        <div className='w-full space-y-6'>
            <div className='space-y-2 text-center'>
                <h1 className='text-3xl font-bold'>Log In</h1>
                <p className='text-gray-500 dark:text-gray-400'>Enter your credentials to access your account</p>
            </div>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder='Enter your email' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='relative'>
                                        <Input
                                            id='password'
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder='Enter your password'
                                            {...field}
                                        />
                                        <Button
                                            type='button'
                                            variant='ghost'
                                            size='icon'
                                            className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                                            onClick={togglePasswordVisibility}
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        >
                                            {showPassword ? (
                                                <EyeOffIcon className='h-4 w-4' />
                                            ) : (
                                                <EyeIcon className='h-4 w-4' />
                                            )}
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> 
                    <Button type='submit' className='w-full'>Log In</Button>

                    <Link href='/auth/forgot-password' className='flex justify-center w-full text-sm text-blue-600 hover:underline'>
                        Forgot your password?
                    </Link>

                    <div className='grid grid-cols-2 gap-4 w-full'>
                        <Button variant='outline' type='button' className='w-full'>
                            <GithubIcon className='mr-2 h-4 w-4' />
                            GitHub
                        </Button>
                        <Button variant='outline' type='button' className='w-full'>
                            <Image src='/google-icon.svg' alt='google icon' width={24} height={24} />
                            Google
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export { LoginForm }
