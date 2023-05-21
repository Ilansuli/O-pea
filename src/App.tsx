import {
  RouterProvider,
} from "react-router-dom";
import "./assets/styles/styles.scss";
import { router } from './router'


const App = () => {

  return (
      <RouterProvider router={router} />
  )
}
export default App

