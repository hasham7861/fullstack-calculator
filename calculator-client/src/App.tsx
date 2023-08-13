import Navbar from "./components/navbar/Navbar";
import ErrorPage from "./pages/Error";
import Home from "./pages/Home/Home"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import './App.css'

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

  return (
    <RouterProvider router={router} />
  )
}

export default App
