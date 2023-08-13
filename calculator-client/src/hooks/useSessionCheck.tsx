import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { toast } from "../components/toast/Toast";
import BackendClient from "../lib/backend-client";

function useSessionCheck() {
  const { isLoggedIn, setUserLoggedIn, login } = useAppContext();

  useEffect(() => {
    BackendClient.get(`/auth/session-activity`)
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
