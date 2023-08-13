import { Link, Outlet } from 'react-router-dom';
import './Navbar.css';
import { useAppContext } from '../../context/AppContext';

function Navbar() {

  const {isLoggedIn, logout, emailOfUserLoggedIn} = useAppContext();

  const handleLogout = () => {
    logout();
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
              <p>{emailOfUserLoggedIn}</p>
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
