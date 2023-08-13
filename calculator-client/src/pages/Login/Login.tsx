import axios from 'axios';
import './Login.css'
import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {setUserLoggedIn, login} = useAppContext()
  const navigate = useNavigate();


  const loginAndRedirect = () => {
    setUserLoggedIn(username)
    login()
    navigate('/');
  }

  const onClickHandleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      // TODO: create an interface/ client to talk with the backend
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/login`, 
      { username, password },
      { withCredentials: true }
      );
      console.log(response.data.message);
      loginAndRedirect()
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  const onClickHandleSignUp = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/signup`,
      { username, password },
      { withCredentials: true });
      console.log(response.data.message);
      loginAndRedirect()
    } catch (error) {
      console.error('Signup error:', error);
    }
  };
  return (
    <div>
      <div className="login-form-container">
        <h2>Login / Sign up</h2>
        <form className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}/>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
          <button onClick={onClickHandleLogin}>Login</button>
          <button onClick={onClickHandleSignUp}>Sign up</button>
        </form>
    </div>
    </div>
  );
}
export default Login;
