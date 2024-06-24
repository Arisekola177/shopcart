
import Navbar from "./Navbar"
import {getUser} from '../../../../actions/getUser'

const page = async () => {
    const currentUser = await getUser()
    
  return (
    <div>
        <Navbar currentUser={currentUser} />
    </div>
  )
}

export default page