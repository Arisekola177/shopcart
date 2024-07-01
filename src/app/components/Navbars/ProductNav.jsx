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
       
             <div className="flex flex-col md:gap-1 xl:gap-3 overflow-hidden">
          
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