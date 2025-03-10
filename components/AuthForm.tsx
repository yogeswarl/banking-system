"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {z} from 'zod';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import {Button} from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import CustomInput from './CustomInput';
import { authformSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { sign } from 'crypto';
import { useRouter } from 'next/navigation';
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions';
import PlaidLink from './PlaidLink';
const formSchema = z.object({
  email: z.string().email(),
})
const AuthForm = ({type}:{type:string}) => {

  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = authformSchema(type)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) =>{
    setIsLoading(true);
    try{
      if(type==='sign-up'){
        const userData = {
          firstName: values.firstName!,
          lastName: values.lastName!,
          address1: values.address1!,
          city: values.city!,
          state: values.state!,
          postalCode: values.postalCode!,
          dateOfBirth: values.dateOfBirth!,
          ssn: values.ssn!,
          email: values.email,
          password: values.password
        }

        const newUser = await signUp(userData)
        setUser(newUser)
      }

      if(type==='sign-in'){
        const response = await signIn({
          email: values.email,
          password: values.password
        })
        if(response) router.push('/')
      }
    }
    catch(error){
      console.log(error)
    }
    finally{
      setIsLoading(false);
    }
  }
    

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
      <Link href='/' className='cursor-pointer items-center gap-1 flex' >
        <Image src="/icons/logo.svg" width={34} height={34} alt="Horizon Logo" className='size-[24px] max-xl:size-14'/>
        <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
      </Link>
      <div className="flex flex-col gap-1 md:gap-3">
        <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
          {user ? 'Link Account': type === 'sign-in' ? 'Sign In' : 'Sign Up'}
          <p className="text-16 font-normal text-gray-600">
            {user ? 'Link you account to get started': 'Please enter your details'}
          </p>
        </h1>
      </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary"/>
        </div> 
      ):(
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type==='sign-up' && (
                <>
                <div className='flex gap-4'>
                  <CustomInput control={form.control} name='firstName' label='First Name' placeholder='Enter your first name' />
                  <CustomInput control={form.control} name='lastName' label='Last Name' placeholder='Enter your last name' />
                </div>
                <CustomInput control={form.control} name='address1' label='Address' placeholder='Enter your specific address' />
                <CustomInput control={form.control} name='city' label='City' placeholder='Enter your City' />
                <div className='flex gap-4'>
                  <CustomInput control={form.control} name='state' label='State' placeholder='Ex: NY' />
                  <CustomInput control={form.control} name='postalCode' label='Postal Code' placeholder='Ex: 11101' />
                </div>
                <div className="flex gap-4">
                  <CustomInput control={form.control} name='dateOfBirth' label='Date of Birth' placeholder='YYYY-MM-DD' />
                  <CustomInput control={form.control} name='ssn' label='SSN' placeholder='Ex: 1234' />
                </div>
                </>
              )}
              <CustomInput control={form.control} name='email' label='Email' placeholder='Enter your email' />
              <CustomInput control={form.control} name='password' label='Password' placeholder='Enter your password' />
              <div className='flex flex-col gap-4'>

                <Button type="submit" className='form-btn' disabled={isLoading}>
                  {isLoading ? (
                    <> 
                    <Loader2 size={20} className='animate-spin' /> &nbsp; Loading...
                    </>
                  ): type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                </Button>              
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className='text-14 font-normal text-gray-600'>{type==='sign-in' ? "Don't have an account" : 'Already Have an account'}</p>
            <Link className='form-link' href={type==='sign-in' ? ' /sign-up' : ' /sign-in'}>{type==='sign-in' ? 'Sign Up' : 'Sign In'}</Link>
          </footer>
        </>
      )}
    </section>
  )
}

export default AuthForm