import getOrders from "../../../actions/getOrders"
import getProduct from "../../../actions/getProduct"
import getUsers from '../../../actions/getUsers'
import Summary from './Summary'
import BarGraph from './BarGraph'
import getGraphData from '../../../actions/getGraphData'
import Nulldata from "../components/Nulldata"
import { getUser } from "../../../actions/getUser"


const Admin = async() => {

  const products = await getProduct({category: null})
  const orders = await getOrders()
  const users = await getUsers()
  const graphData = await getGraphData()
  const currentUser = await getUser()

  if(!currentUser || currentUser.role !== 'ADMIN'){
    return  <Nulldata title='Oops! Access denied' />
  }
  return (

   
    <div className="">
      <Summary products={products} orders={orders} users={users} />
      <div className="mt-4 mx-auto mb-4 max-w-[1150px]">
        <BarGraph data={graphData} />
      </div>
    </div>
  )
}

export default Admin