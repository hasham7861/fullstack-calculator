import { Link, Outlet } from 'react-router-dom';
import './Navbar.css';
import { useAppContext } from '../../context/AppContext';
import { toast } from '../toast/Toast';
import BackendClient from '../../lib/backend-client';

function Navbar() {

  const {isLoggedIn, logout, userLoggedIn} = useAppContext();

  const handleLogout = () => {
    BackendClient.post('/auth/logout', null)
    .then(response => {
      logout();
      toast.success(response.data.message);
    })
    .catch(error => {
      toast.error(`Error logging out ${error.message}`);
    });
  };

  return (
    <>
      <div className='navbar'>
        <ul>
          <li>
            <Link to="/" className="nav-link">
              <div className="logo-and-title">
                <div className="logo">
                  <div className="circle"></div>
                </div>
                <span className="app-title">Calculator App</span>
              </div>
            </Link>
          </li>
          {isLoggedIn ? (
            <li className="user-info">
              <p>{userLoggedIn}</p>
              <button onClick={handleLogout} className="user-icon">
                🙋‍♂️
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="nav-link">
                Login / Sign up
              </Link>
            </li>
          )}
        </ul>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
