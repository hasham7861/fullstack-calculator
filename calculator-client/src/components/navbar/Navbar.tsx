import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {

    setLoggedIn(true);
  };

  const handleLogout = () => {

    setLoggedIn(false);
  };

  return (
    <>

    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {loggedIn ? (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login/Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
    <Outlet/>
    </>
  );
}

export default Navbar;
