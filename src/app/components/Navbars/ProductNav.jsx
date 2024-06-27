'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import {categories} from '../../utils/Categories'
import Category from '../Category'


const ProductNav = () => {
const params = useSearchParams()

const category = params.get('category')

const pathname = usePathname()

const isMainPage = pathname ==='/';

if(!isMainPage) return null;
  return (
    <div className="w-6/12 mx-auto transition-colors">
         <div className=" ">
         <h2 className=" font-semibold text-sm py-3">Product Categories</h2>
             <div className="flex flex-col gap-3 overflow-hidden">
          
                 {
                  categories.map((item) => (
                   <Category 
                    key={item.label}
                    label={item.label}
                    Icon={item.icon}
                    selected={category === item.label || (category === null && item.label === 'All')}
                   />
                  ))
                 }
                 
             </div>
            
         </div>
    </div>
  )
}

export default ProductNav