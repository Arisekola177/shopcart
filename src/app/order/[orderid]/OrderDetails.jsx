'use client'
import { formatDistanceToNow } from 'date-fns';
import FormattedPrice from '../../components/FormattedPrice';
import Status from '../../components/Status'
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from 'react-icons/md';
import OrderItems from '../OrderItems'
const OrderDetails = ({order}) => {

console.log(order)
  return (
    <div className="w-10/12 mx-auto py-16 flex flex-col gap-2">
       <div className="mt-8">
           <h2>Order Details</h2>
       </div>

       <div>Order Id: {order.id} </div>
       <div>Total Amount: <span className="font-bold"><FormattedPrice amount={order.amount} /></span></div>
       <div className='flex gap-2 items-center'>
       <div>Payment Status:</div>
       <div>
          {order.status === 'pending' ? 
          <Status text='pending' 
          Icon={MdAccessTimeFilled} 
          bg='bg-slate-200'
           color='text-slate-700' />: 
           order.status === 'completed' ?
           <Status text='completed'
            Icon={MdDone} 
            bg='bg-green-200'
             color='text-purple-700' />:
             <></>
        }
       </div>
       </div>
       <div className='flex gap-2 items-center'>
       <div>Delivery Status:</div>
       <div>
          {order.deliveredStatus === 'pending' ? 
          <Status text='pending' 
          Icon={MdAccessTimeFilled} 
          bg='bg-slate-200'
           color='text-slate-700' />: 
           order.deliveredStatus === 'dispatched' ?
           <Status text='dispatched'
            Icon={MdDeliveryDining} 
            bg='bg-purple-200'
             color='text-purple-700' />:
             order.deliveredStatus === 'delivered' ?
             <Status text='delivered'
              Icon={MdDone} 
              bg='bg-green-200'
               color='text-green-700' />:
             <></>
        }
       </div>
       </div>
       <div> Date: {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}, </div>
       <div>
          <h2 className='font-semibold mt-4 mb-2'>Product Ordered</h2>
          <div className='grid grid-cols-5 text-xs gap-4 pb-2 items-center'>
             <div className='col-span-2 justify-self-start'>PRODUCT</div>
             <div className='justify-self-center'>PRICE</div>
             <div className='justify-self-center'>QTY</div>
             <div className='justify-self-end'>TOTAL</div>
          </div>
          {order.products && order.products.map((item) => (
              <OrderItems key={item.id} item={item} />
          ))}
       </div>
  </div>
  )
}

export default OrderDetails