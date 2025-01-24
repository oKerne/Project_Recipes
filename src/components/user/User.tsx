import { useContext, useReducer } from "react";
import userReducer, { initialState, UserContext } from "./userReducer";
import Login from "./Login";
import UpdateUser from "./UpdateUser";

const User = () => {
const {state:user,dispatch} = useContext(UserContext)
  return (<>
      {!user.email ? <Login /> : <UpdateUser />}
      </>
  )
}

export default User;
