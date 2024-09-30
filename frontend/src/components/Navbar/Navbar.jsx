import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/');
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    if (searchVisible) setSearchQuery(""); // Clear input if hiding
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchVisible(false); // Hide search bar after submitting
    }
  };

  return (
    <div className='navbar'>
      <Link to='/' onClick={() => setMenu("home")}>
        <img className='logo' src={assets.logo} alt="Logo" />
      </Link>
      <ul className="navbar-menu">
        <li>
          <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        </li>
        <li>
          <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        </li>
        <li>
          <a href='#app-download' onClick={() => setMenu("mob-app")} className={menu === "mob-app" ? "active" : ""}>Mobile App</a>
        </li>
        <li>
          <a href='#footer' onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>Contact Us</a>
        </li>
        {token && (
          <li>
            <Link to="/profile" onClick={() => setMenu("profile")} className={menu === "profile" ? "active" : ""}>Profile</Link>
          </li>
        )}
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" onClick={toggleSearch} />
        {searchVisible && (
          <form onSubmit={handleSearchSubmit} className="navbar-search-form">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="navbar-search-input"
            />
            <button type="submit" className="navbar-search-button">Search</button>
          </form>
        )}
        <Link to='/cart' className='navbar-search-icon'>
          <img src={assets.basket_icon} alt="Cart" />
          {getTotalCartAmount() > 0 && <div className="dot"></div>}
        </Link>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="Profile" />
            <ul className='navbar-profile-dropdown'>
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="Orders" /> <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" /> <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
