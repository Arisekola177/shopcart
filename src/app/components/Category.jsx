'use client'
import { useSearchParams } from "next/navigation"
import {useRouter} from 'next/navigation'
import { useCallback } from "react"
import queryString from 'query-string'


const Category = ({label, Icon, selected}) => {
  const router = useRouter()

  const params = useSearchParams()

  const handleClick = useCallback (() => {
     if(label === 'All'){
      router.push('/')
     }else{
      let currentQuery = {};
      if(params){
        currentQuery = queryString.parse(params.toString())
      }
      const updatedQuery = {
        ...currentQuery,
        category: label
      }

      const url = queryString.stringifyUrl({
        url: '/',
        query: updatedQuery
      },
      {
        skipNull: true
      }
    )

    router.push(url)
     }

  },[label, params, router] )  
  return (
    <div onClick={handleClick} className={`flex items-center justify-between text-center  p-2 border-b-2 hover:text-slate-400 transition cursor-pointer
      ${selected ? 'border-b-slate-800 text-slate-800' : 'border-transparent text-slate-500'}
    `}>
      
      <Icon size={20} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  )
}

export default Category