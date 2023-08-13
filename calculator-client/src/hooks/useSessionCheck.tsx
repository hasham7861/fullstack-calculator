import axios from "axios";
import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { toast } from "../components/toast/Toast";

function useSessionCheck() {
  const { isLoggedIn, setUserLoggedIn, login } = useAppContext();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/session-activity`, { withCredentials: true })
      .then(response => {
        if (response.data.authenticated && !isLoggedIn) {
          login();
          setUserLoggedIn(response.data.username);
        }
      })
      .catch(error => {
        toast.error(`Error fetching session status ${error.message}!`)
      });
  }, [isLoggedIn, login, setUserLoggedIn]);
}

export default useSessionCheck;
