import { useEffect } from 'react'
import { useAppDispatch } from "./hooks";

import { userService } from "./services/user.service";

import AppIndex from "./views/AppIndex";

import { loadUsers, setLoggedinUser } from "./store/actions/user.action";

import "./assets/styles/styles.scss";
import 'react-lazy-load-image-component/src/effects/blur.css'

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

