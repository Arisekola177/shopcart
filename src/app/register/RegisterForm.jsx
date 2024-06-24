
'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from 'next-auth/react'
import axios from "axios"
import { FaEyeSlash, FaEye, FaUser, FaEnvelope, } from "react-icons/fa";
import { passwordStrength } from "check-password-strength";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import PasswordStrength from "../components/PasswordStrength";
import { toast } from "react-toastify"
import { MdShoppingCart } from "react-icons/md"


const FormSchema = z.object({
  firstName:z
  .string()
  .min(2, "First name must be atleast 2 characters")
  .max(45, "First name must be less than 45 characters")
  .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed"),
  lastName:z
  .string()
  .min(2, "Last name must be atleast 2 characters")
  .max(45, "Last name must be less than 45 characters")
  .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be atleast 6 characters").max(40, "Password must be less than 40 characters"),
  confirmPassword: z.string().min(6, "Password must be atleast 6 characters").max(40, "Password must be less than 40 characters"),
  accepted:z.literal(true, {
    errorMap: () =>({
      message: "Please accept all terms"
    }),
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password and confirm password doesn't match!",
  path: ["confirmPassword"],
});


const RegisterForm = ({currentUser}) => {
  const router = useRouter()
  const {register, handleSubmit, watch, reset, formState:{errors}} = useForm({
    resolver: zodResolver(FormSchema)
  })
 
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [passStrength, setPassStrength] = useState(0);

  useEffect(() => {
    setPassStrength(passwordStrength(watch().password).id);
  }, [watch().password]);
 

  const saveUser = async (data) => {
    setLoading(true)
    axios.post('/api/register', data)  
    .then(() => {
      toast.success('Account created');
      signIn('credentials',{
        email: data.email,
        password: data.password,
        redirect: false,
      }).then((response) => {
        if(response.ok){
          router.push('/cart')
          setLoading(false)
          router.refresh()
          toast.success('Logged In')
        }
        if(response.error){
          toast.error(response.error)
        }
      });
    }).catch(() => toast.error('Something went wrong')).finally(() =>{
      setLoading(false)
      reset()
    })
    
  };
  
  if(currentUser){
    return   <p className="text-center py-16 text-2xl">Logged In.....Redirecting</p>
  }

  return (
    <div className="w-10/12 mx-auto grid grid-cols-3 justify-between">
      <div className="col-span-1">
      <div className='flex flex-col items-center justify-center h-full '>
           <div className="">
                <Link className="flex items-center gap-2" href='/'>
                   <h1 className="text-5xl font-semibold mb-2 text-blue-600 cursor-pointer">
                     SHOP<span className="text-yellow-400">CART</span>
                    </h1>
                  <div className="">
                  <MdShoppingCart className="text-5xl " />
                 </div>
                 </Link>
                 <p className='text-xl mt-5'>Your one stop gadget shop</p>
                 
              </div>
          </div>
      </div>
      <div className="grid col-span-2 justify-center items-center py-8">
        <div className="bg-slate-50 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center py-4">Sign Up</h2>
          <form onSubmit={handleSubmit(saveUser)} className="py-4 px-6 grid grid-cols-2 items-center gap-4">
            
           <div className={`relative w-full ${errors ? 'mb-6' : 'mb-0'}`}>
                  <input
                  {...register("firstName")}
                  type="text"
                  placeholder="First Name"
                   className="rounded-lg py-2 px-10 outline-none placeholder:text-xs border-[1px] border-black focus:outline-slate-500"
                    />
                   <FaUser className={`absolute left-2 text-xs top-1/2 transform -translate-y-1/2 cursor-pointer`} />
                   {errors.firstName && (
                     <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">
                      {errors.firstName.message}
                      </div>
                      )}
                </div>

           < div className={`relative w-full ${errors ? 'mb-6' : 'mb-0'}`}>
            <input 
               {...register("lastName")}
              type="text"
              placeholder="Last Name"
              className="rounded-lg py-2 px-10 outline-none placeholder:text-xs border-[1px] border-black focus:outline-slate-500"
              
            />
             <FaUser className={`absolute left-2 text-xs top-1/2 transform -translate-y-1/2 cursor-pointer`}/>
             {errors.lastName && (
                <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">{errors.lastName.message}</div>
              )}
             </div>
             <div className={`relative col-span-2 ${errors ? 'mb-6' : 'mb-0'}`}>
             <input 
                {...register("email")}
              type="text"
              placeholder="E-mail"
              className="rounded-lg w-full py-2 placeholder:text-xs px-10 outline-none border-[1px] border-black focus:outline-slate-500"
             
            />
            <FaEnvelope className={`absolute left-2 text-xs top-1/2 transform -translate-y-1/2 cursor-pointer`}/>
            {errors.email && (
                <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">{errors.email.message}</div>
              )}
            </div>
          
            <div className={`relative col-span-2  ${errors ? 'mb-6' : 'mb-0'}`}>
              <input 
                 {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="rounded-lg py-2 px-2 w-full placeholder:text-xs outline-none border-[1px] border-black focus:outline-slate-500"
            
              />
              <FaEyeSlash 
                className={`absolute right-2 top-1/2 text-xs transform -translate-y-1/2 cursor-pointer ${showPassword ? 'hidden' : 'block'}`}
                onClick={() => setShowPassword(true)}
              />
              <FaEye 
                className={`absolute right-2 text-xs top-1/2 transform -translate-y-1/2 cursor-pointer ${showPassword ? 'block' : 'hidden'}`}
                onClick={() => setShowPassword(false)}
              />
               <span><PasswordStrength passStrength={passStrength} /></span>
             {errors.password && (
                <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">{errors.password.message}</div>
              )}
            </div>
            <div className={`relative col-span-2  ${errors ? 'mb-6' : 'mb-0'}`}>
              <input 
                 {...register("confirmPassword")}
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="rounded-lg py-2 px-2 placeholder:text-xs outline-none w-full border-[1px] border-black focus:outline-slate-500"
              
              />
              <FaEyeSlash 
                className={`absolute right-2 text-xs top-1/2 transform -translate-y-1/2 cursor-pointer ${showPassword ? 'hidden' : 'block'}`}
                onClick={() => setShowPassword(true)}
              />
              <FaEye 
                className={`absolute right-2 text-xs top-1/2 transform -translate-y-1/2 cursor-pointer ${showPassword ? 'block' : 'hidden'}`}
                onClick={() => setShowPassword(false)}
              />
                {errors.confirmPassword && (
                <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">{errors.confirmPassword.message}</div>
              )}
            </div>
            <div className="col-span-2 flex items-center gap-2"> 
             <input    {...register("accepted")} type="checkbox" className=" cursor-pointer" /><span className="text-xs"> I accept the terms and condition</span>
            </div>
            <div className="col-span-2 flex justify-center items-center">
              <button disabled={loading} className="mt-5 w-60 bg-slate-800 text-white p-3 text-sm rounded-lg shadow-md">
                {loading ? "Processing..." : "SignUp"}
              </button>
            </div>
            
          </form>
          <p className="text-center py-4 text-xs">Already have an account? <Link className="text-blue-500 hover:underline underline-offset-4" href='/login'>Login</Link> here.</p>
        </div>
      </div>
     
    </div>
  )
}

export default RegisterForm


