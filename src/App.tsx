import {
  RouterProvider,
} from "react-router-dom";
import "./assets/styles/styles.scss";
import 'react-lazy-load-image-component/src/effects/blur.css'
import { router } from './router'


const App = () => {

  return (
      <RouterProvider router={router} />
  )
}
export default App

