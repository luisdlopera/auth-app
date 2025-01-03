'use client'

import * as z from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    username: z.string().min(3, {
        message: 'Username must be at least 3 characters.',
    }),
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters.',
    }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords dont match',
    path: ['confirmPassword'],
})

const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false)

    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {

        try {
            setIsLoading(true)

            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
            const resJson = await response.json();
            console.log('this is the response', resJson)

            if (response.ok) {
                router.push('/dashboard')
                toast({
                    variant: 'default',
                    title: 'Account created!',
                    description: 'Your account has been successfully created.',
                    action: <ToastAction altText='Close'>Close</ToastAction>,
                });
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: resJson.error || 'There was a problem with your request.',
                    action: <ToastAction altText='Try again'>Try again</ToastAction>,
                });
            }

        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your request.',
                action: <ToastAction altText='Try again'>Try again</ToastAction>,
            })
            console.error(error)
        } finally {
            setIsLoading(false)
        }
        // Simulate API call
        // setTimeout(() => {
        //     console.log(values)
        //     setIsLoading(false)

        //     form.reset()
        // }, 2000)
    }

    return (
        <div className='w-full space-y-6'>
            <div className='space-y-2 text-center'>
                <h1 className='text-3xl font-bold'>Register</h1>
                <p className='text-gray-500 dark:text-gray-400'>Create your account</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <FormField
                        control={form.control}
                        name='username'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder='Username' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='email' placeholder='Email' {...field} />
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
                                    <Input type='password' placeholder='Password' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='confirmPassword'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='password' placeholder='Confirm Password' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='submit' className='w-full' disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className='animate-spin mr-2' />
                                Registering...
                            </>
                        ) : (
                            'Register'
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export { RegisterForm }