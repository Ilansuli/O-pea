
import "./assets/styles/styles.scss";
import 'react-lazy-load-image-component/src/effects/blur.css'
import {useEffect} from 'react'
import { useAppDispatch } from "./hooks";
import { loadUser, loadUsers } from "./store/actions/user.action";
import AppIndex from "./views/AppIndex";

const App = () => {
  const dispatch = useAppDispatch()
  useEffect( () => {
    dispatch(loadUsers())
    dispatch(loadUser())
  }, [])
  
  return (
    <AppIndex/>
  )
}
export default App

