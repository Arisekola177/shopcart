import getProduct from '../../../../actions/getProduct'
import ManageProductClient from './ManageProductClient'

import Nulldata from '../../components/Nulldata';
import { getUser } from '../../../../actions/getUser';

const manageproduct = async ({ params }) => {
  const { category } = params;
  const products = await getProduct({category})
  const currentUser = await getUser()
  if(!currentUser || currentUser.role !== 'ADMIN'){
    return  <Nulldata title='Oops! Access denied' />
  }
  return (
    <div className='w-10/12 mx-auto py-8'> <ManageProductClient products={products} /></div>
  )
}

export default manageproduct