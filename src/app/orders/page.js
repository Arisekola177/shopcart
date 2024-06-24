
import Nulldata from '../components/Nulldata'
import getOrdersByUserId from '../../../actions/getOrdersByUserId';
import OrderClient from './OrderClient';
import { getUser } from '../../../actions/getUser';

const Orders = async () => {
 const currentUser = await getUser()
  if(!currentUser){
    return  <Nulldata title='Oops! Access denied' />
  }

  const orders = await getOrdersByUserId(currentUser.id)

  if(!orders){
    return  <Nulldata title='No orders yet.......' />
  }
  return (
    <div className='w-10/12 mx-auto py-4'> <OrderClient orders={orders} /></div>
  )
}

export default Orders