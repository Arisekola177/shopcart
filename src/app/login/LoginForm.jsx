'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { MdShoppingCart } from "react-icons/md"
import Button from '../components/Button'

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
    <div className="flex justify-center items-center py-16 col-span-2">
      <div className="w-[500px] bg-slate-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center py-4">Login</h2>
        <div className="p-6">
        <Button />
        </div>
          
            <p className="text-xl font-semibold text-center">OR</p>
         
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
</div>
  )
}

export default LoginForm