
import "./assets/styles/styles.scss";
import 'react-lazy-load-image-component/src/effects/blur.css'
import { useEffect } from 'react'
import { useAppDispatch, useWindowSize, } from "./hooks";
import { loadUsers, setLoggedinUser } from "./store/actions/user.action";
import AppIndex from "./views/AppIndex";
import { userService } from "./services/user.service";
import { useNavigate } from "react-router-dom";

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {

    loadUser()
    dispatch(loadUsers())
  }, [dispatch])

  const loadUser = () => {
    let loggedinUser = userService.getLoggedinUser();
    if (loggedinUser) {
      return dispatch(setLoggedinUser(loggedinUser))
    } else {
      userService.saveLocalUser(userService.getGuestUser())
    }
  }
  return (
    <AppIndex />
  )
}
export default App

