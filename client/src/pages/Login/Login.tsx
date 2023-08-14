import './Login.css'
import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackendClient from '../../lib/backend-client';

function Login() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {setUserLoggedIn, login, setCalculationsHistory, calculationStore} = useAppContext()
  const navigate = useNavigate();

  const syncLocalStorageWithLoggedInHistory = async () => {
    try {
      const fetchedHistory = await BackendClient.get('/math/fetch-history')
      setCalculationsHistory(fetchedHistory.data)
      calculationStore.setStoredExpressions(fetchedHistory.data)
    } catch (error) {
      setCalculationsHistory([])
      calculationStore.setStoredExpressions()
    }
  }
  const loginAndRedirect = async () => {
    setUserLoggedIn(username)
    login()
    await syncLocalStorageWithLoggedInHistory()
    navigate('/');

  }

  const onClickHandleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const response = await BackendClient.post('/auth/login', 
      { username, password },
      );
      loginAndRedirect()
      toast.success(response.data.message);
    } catch (error) {
      toast.error(`Login error ${error}`);
    }
  };
  const onClickHandleSignUp = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const response = await BackendClient.post('/auth/signup',
      { username, password });
      loginAndRedirect()
      toast.success(response.data.message);
    } catch (error) {
      toast.error(`Sign up error: ${error}`);
    }
  };
  return (
    <div className='login-wrapper'>
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
