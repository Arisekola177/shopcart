
import AddProductForm from "./AddProductForm"
import {getUser} from '../../../../actions/getUser'
import Nulldata from "../../components/Nulldata"

const Addproduct = async () => {

  const currentUser = await getUser()

  if(!currentUser || currentUser.role !== 'ADMIN'){
    return  <Nulldata title='Oops! Access denied' />
  }
  return (
    <div> 
     <AddProductForm />
    </div>
  )
}

export default Addproduct