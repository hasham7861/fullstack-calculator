import { useAppContext } from "../context/AppContext";
import { toast } from "../components/toast/Toast";
import BackendClient from "../lib/backend-client";
import { useEffect } from "react";

function useSessionCheck() {
  const { setUserLoggedIn, login } = useAppContext();

  useEffect(() => {
    BackendClient.get(`/auth/session-activity`)
      .then(response => {
        if (response.data.authenticated) {
          login();
          setUserLoggedIn(response.data.username);
        }
      })
      .catch(error => {
        toast.error(`Error fetching session status ${error.message}!`)
      });
  }, []);
 
}

export default useSessionCheck;
