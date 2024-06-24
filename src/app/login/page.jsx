

import { getUser } from "../../../actions/getUser"
import LoginForm from "./LoginForm"


const Login = async () => {
  const currentUser = await getUser()
  return (
     <div>
      <LoginForm currentUser={currentUser} />
     </div>
  )
}

export default Login