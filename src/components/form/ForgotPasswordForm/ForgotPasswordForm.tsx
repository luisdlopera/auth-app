'use client'

// import Image from 'next/image';
// import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
// import { EyeIcon, EyeOffIcon, GithubIcon } from 'lucide-react';
// import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
// import { useState } from 'react';
import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'


const formSchema = z.object({
    email: z.string()
        .email({ message: 'Invalid email address.' })
        .min(5, { message: 'Email must be at least 5 characters.' }),
});

const ForgotPasswordForm = () => {


    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
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
                <h1 className='text-3xl font-bold'>Forgot your password?</h1>
                <p className='text-gray-500 dark:text-gray-400'>Enter your email for recovery</p>
            </div>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder='Enter email' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='submit' className='w-full'>Send</Button>
                </form>
            </Form>
        </div>
    )
}

export { ForgotPasswordForm }
