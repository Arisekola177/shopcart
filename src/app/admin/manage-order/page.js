

import ManageOrdersClient from './ManageOrdersClient';
import getOrders from '../../../../actions/getOrders'
import Nulldata from '../../components/Nulldata'
import { getUser } from '../../../../actions/getUser';

const manageOrders = async () => {
 const currentUser = await getUser()
  const orders = await getOrders()
 
  if(!currentUser || currentUser.role !== 'ADMIN'){
    return  <Nulldata title='Oops! Access denied' />
  }
  return (
    <div className='w-10/12 mx-auto py-4'> <ManageOrdersClient orders={orders} /></div>
  )
}

export default manageOrders