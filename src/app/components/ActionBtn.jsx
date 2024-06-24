
const ActionBtn = ({Icon, onClick, disabled}) => {
  return (
    <button onClick={onClick}  disabled={disabled}
     className={`flex items-center justify-center rounded cursor-pointer py-2 w-[30px] h-[20px] text-slate-700 border border-slate-400 hover:scale-110 duration-300 ${disabled && 'opacity-50 cursor-not-allowed'}`}>
      <Icon size={18} />
    </button>
  )
}

export default ActionBtn