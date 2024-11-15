'use client'

import Image from 'next/image';
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { EyeIcon, EyeOffIcon, GithubIcon } from 'lucide-react';
// import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react';
import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'


const formSchema = z.object({
    username: z.string()
        .min(2, { message: 'Username must be at least 2 characters.' })
        .regex(/^[a-zA-Z0-9_]+$/, { message: 'Username can only contain letters, numbers, and underscores.' }),
    password: z.string()
        .min(6, { message: 'Password must be at least 6 characters.' })
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, { message: 'Password must contain at least one letter and one number.' }),
});

const LoginForm = () => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
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
                        name='username'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder='Enter username' {...field} />
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
                    {/* <Separator className='w-full' /> */}
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
