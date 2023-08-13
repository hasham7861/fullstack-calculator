import axios from "axios";
import { Calculator } from "../../components"
import { useAppContext } from "../../context/AppContext";
import "./Home.css"
import { useEffect } from "react";

function Home() {

    const {isLoggedIn, setUserLoggedIn, login} = useAppContext();
    
    useEffect(() => {
        // Fix this to use client to make request
        axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/session-activity`, { withCredentials: true })
          .then(response => {
            if(response.data.authenticated && !isLoggedIn) {
                login();
                setUserLoggedIn(response.data.username);
            }
            
          })
          .catch(error => {
            console.error('Error fetching session status:', error);
          });
    }, [isLoggedIn, login, setUserLoggedIn]);

    return <div className="home-page">
        <Calculator/>
    </div>

}

export default Home