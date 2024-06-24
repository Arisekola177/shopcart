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
    <div className="w-full bg-white py-6 transition-colors">
         <div className="w-10/12 mx-auto ">
             <div className="pt-4 flex flex-row items-center justify-between overflow-hidden">
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