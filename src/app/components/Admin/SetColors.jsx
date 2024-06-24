import { useCallback, useEffect, useState } from "react"
import SelectImage from "../../components/Admin/SelectImage";



const SetColors = ({item, addImageToState, removeImageFromState, isProductCreated}) => {

    const [isSelected, setIsSelected] = useState(false)
    const [file, setFile] = useState(null)


    useEffect(() => {
        if (isProductCreated) {
            setIsSelected(false);
            setFile(null);
        }
    }, [isProductCreated]);
    
    const handleFileChange = useCallback((file) => {
        setFile(file);
        addImageToState({file, color: item.color, colorCode: item.colorCode});
    }, [addImageToState, item]);
   
    
    const handleCheck = useCallback((e) => {
        setIsSelected(e.target.checked);
    
        if (!e.target.checked) {
            setFile(null);
            removeImageFromState(item);
        }
    }, []);
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto border-b-[1px] border-slate-200 items-center p-2">
          <div className="flex gap-2 items-center h-[60px]">
            <input id={item.color} type="checkbox" checked={isSelected} onChange={handleCheck}  className="cursor-pointer"/>
            <label htmlFor={item.color} className="font-medium cursor-pointer">{item.color}</label>
          </div>
          <>
           {
            isSelected && !file && (
                <div className="col-span-2 text-center">
                   <SelectImage handleFileChange={handleFileChange} item={item} />
                </div>
            )
           }
           {file && (<div className="flex gap-2 text-sm col-span-2 items-center justify-between">
             <p>{file.name}</p>
             <div className="w-[70px]">
                <button small='true' outline='true' onClick={() => 
                    {setFile(null)
                     removeImageFromState(item)}}>Cancel</button>
             </div>
           </div>)}
          </>
    </div>
  )
}

export default SetColors


 

