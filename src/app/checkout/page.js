import { getUser } from "../../../actions/getUser"
import CheckoutClient from "./CheckoutClient"

// I later used the cart's CartCheckout to checkout. I just wanna leave this here for educative purposes
const page = async () => {
    const currentUser = await getUser()
  return (
    <div>
        <CheckoutClient currentUser={currentUser} />
    </div>
  )
}

export default page