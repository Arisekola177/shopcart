
const page = () => {
  return (
    <div className="w-full py-24  ">
        <div className="w-10/12 mx-auto py-16  flex flex-col gap-6 justify-center items-center bg-slate-100 shadow-lg rounded-lg ">
            <h2 className="text-2xl font-semibold text-green-600">Payment successful !!</h2>
            <div className="bg-slate-700 text-white rounded-lg">
            <button className="py-2 px-3" >View Your Order</button>
            </div>
       </div>
    </div>
  )
}

export default page