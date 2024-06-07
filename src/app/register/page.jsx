
import { getUser } from "../../../actions/getUser"
import RegisterForm from "./RegisterForm"

const Register = async () => {

  const currentUser = await getUser()
   
  return (
     <div>
      <RegisterForm currentUser={currentUser} />
     </div>
  )
}

export default Register