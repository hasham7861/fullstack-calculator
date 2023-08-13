import Navbar from "./components/navbar/Navbar";
import ErrorPage from "./pages/Error";
import Home from "./pages/Home/Home"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import './App.css'
import { ToastWrapper } from "./components/toast/Toast";
import useSessionCheck from "./hooks/useSessionCheck";

const router = createBrowserRouter([
  {
    
    element: <Navbar/>,
    children: [
      {
        path: "/",
        element: <Home/>,
        errorElement: <ErrorPage />,
      },
      {
        path: "/login",
        element: <Login/>
      }
    ]
  }
]);

function App() {

  useSessionCheck();

  return (
    <div className="app-container ">
      <ToastWrapper/>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
