import axios from 'axios';
import './Login.css'
import { useState } from 'react';

function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onClickHandleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/login`, { email, password });
      console.log(response.data.message);
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  const onClickHandleSignUp = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/signup`, { email, password });
      console.log(response.data.message);
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
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
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
