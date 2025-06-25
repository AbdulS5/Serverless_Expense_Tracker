import React from 'react';
import {Link} from 'react-router-dom'
import './Sidebar.css';

function Sidebar() {
  return (
    <div className = "sidebar">
      <div className="profile">
        <img src="https://i.pravatar.cc/100" alt="User" className='profile-pic' />
        <h3 className='username'>Abdul Samd</h3>
      </div>
      <div className="links">
        <ul> 
            <li><Link to="/">Home</Link></li>
            <li><Link to="/expenses">Expense List</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;