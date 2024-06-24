'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import {MdDashboard, MdDns, MdFormatListBulleted, MdLibraryAdd} from 'react-icons/md'

const AdminNavbar = () => {
    
    const pathname = usePathname()

    const isActiveLink = (href) => {
        return pathname === href ? 'border-b-2 border-slate-800' : ''
    }
  return (
    <div className="w-full top-20 border-b-[1px] shadow-md pt-4">
       <div className="w-7/12 mx-auto flex flex-row justify-between overflow-x-auto items-center gap-6 py-2 flex-nowrap">
          <div className={`py-2 text-slate-800 ${isActiveLink('/admin')}`}>
          <Link className="flex items-center gap-2" href='/admin'>
             <MdDashboard />
             <p className="text-lg font-semibold text-slate-500">Summary</p>
         </Link>
         </div>
         <div className={`py-2 ${isActiveLink('/admin/manage-product')}`}>
          <Link className="flex items-center gap-2" href='/admin/manage-product'>
             <MdDns />
             <p className="text-lg font-semibold text-slate-500">Manage-Products</p>
         </Link>
         </div>
         <div className={` py-2 ${isActiveLink('/admin/add-product')}`}>
          <Link className="flex items-center gap-2" href='/admin/add-product'>
          <MdLibraryAdd />
             <p className="text-lg font-semibold text-slate-500">Add-Products</p>
         </Link>
         </div>
         <div className={`py-2 ${isActiveLink('/admin/manage-order')}`}>
          <Link className="flex items-center gap-2" href='/admin/manage-order'>
          <MdFormatListBulleted />
            
             <p className="text-lg font-semibold text-slate-500">Manage-Orders</p>
         </Link>
         </div>
        
       </div>
    </div>
  )
}

export default AdminNavbar


