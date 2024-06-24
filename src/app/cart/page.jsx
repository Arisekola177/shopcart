
import { getUser } from "../../../actions/getUser"
import CartPage from "./CartPage"


const page = async () => {
  const currentUser = await getUser()
  return (
    <div>
        <CartPage currentUser={currentUser} />
    </div>
  )
}

export default page


