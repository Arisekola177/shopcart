'use client'

import Link from "next/link"
import Button from "../components/Button"
import { useEffect, useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import toast, { Toaster } from "react-hot-toast";

const LoginForm = ({currentUser}) => {

 const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
   if(currentUser){
    router.push('/cart')
    router.refresh()
   }
},[])

  const handleLogin = (e) => {
    e.preventDefault()
    const data = { email, password}
    setLoading(true)
    signIn('credentials', {
      ...data,
      redirect: false
    }).then((response)=> {
     
      if(response.ok){
        router.push('/cart')
        router.refresh()
        toast.success('Logged In')
        setLoading(false)
      }
      if(response.error){
        toast.error(response.error) 
      }
    })
 
  }

  if(currentUser){
    return   <p className="text-center py-16 text-3xl">Logged In.....Redirecting</p>
   
  }
  return (
    <div className="container mx-auto font-roboto">
    <div className="flex justify-center items-center py-16">
      <div className="w-[500px] bg-slate-50 rounded-lg shadow-lg">
         <h2 className="text-2xl font-bold text-center py-4">Login</h2>
         <div className="flex py-8 px-6 justify-center items-center">   
             <Button />
              </div>
              <h2 className="uppercase text-center font-light text-slate-500">or</h2>
         <form onSubmit={handleLogin} className="py-8 px-6 flex flex-col gap-4">
           <input 
           type="text"
           placeholder="Email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           className="rounded-lg py-3 px-2 outline-none w-full border-[1px] border-black focus:outline-slate-500"
           />
             <input 
           type="password"
           placeholder="Password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           className="rounded-lg py-3 px-2 outline-none w-full border-[1px] border-black focus:outline-slate-500"
           />
           <button disabled={loading} className="mt-5 bg-slate-800 text-white py-3 px-2 rounded-lg shadow-md">Submit</button>
      
         </form>
         <p className="text-center py-2 text-xs">Don't have an account ? <Link className="text-blue-500 hover:underline underline-offset-4" href='/register'>Sign up</Link> here.</p>
    </div>
    </div>
    <Toaster />
</div>
  )
}

export default LoginForm