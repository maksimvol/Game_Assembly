import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { NavLink, useLocation } from "react-router-dom";
import Triangle from './Images/triangle.png';

const Navbar = ({ user }: any) => {
  const location = useLocation();
  const category_path = location.pathname;
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="navbar">
      <div className="logo-section">
        <img
          className="logo"
          alt="Logo"
          src="/logo192.png"    
          onClick={() => window.location.href = "/"}
        />
      </div>

      <div className="navbarList">
        {['/', '/addGame', '/addApp', '/addJackpot', '/addMath', '/profile'].map((path, idx) => {
          const textMap: Record<string, string> = {
            '/': 'Home',
            '/addGame': 'Add Game',
            '/addApp': 'Add App',
            '/addJackpot': 'Add Jackpot',
            '/addMath': 'Add Math',
            '/profile': 'Profile',
          };
          const isActive = category_path.startsWith(path) && path !== '/' ? true : category_path === path;

          return (
            <NavLink
              key={path}
              to={path}
              className="navItems"
              style={{ textDecoration: 'none' }}
            >
              <div className={`item ${isActive ? "active-link" : ""}`}>
                <p className="itemText">{textMap[path]}</p>
              </div>
            </NavLink>
          );
        })}
      </div>

      <div className="rightSection">
        {user?.username ? (
          <>
            <span className="itemText">Hello, {user.username}</span>
            {/* <NavLink to="/logout" className="itemText">Log Out</NavLink> */}
          </>
        ) : (
          <>
            <NavLink to="/login" className="itemText">Login</NavLink>
            <NavLink to="/register" className="itemText">Registration</NavLink>
          </>
        )}
        <span className="itemText" style={{ marginLeft: 15, fontSize: 14 }}>
          {currentDateTime}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
