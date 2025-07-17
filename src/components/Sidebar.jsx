import React from 'react';
import {Link} from 'react-router-dom'
import './Sidebar.css';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

function Sidebar({ user }) {
  if (!user) return null;
  return (
    <div className = "sidebar">
      <h4>Serverless Expense Tracker</h4>
      <div className="profile">
        <img src="https://i.pravatar.cc/100" alt="User" className='profile-pic' />
        <h3 className="username">{user?.displayName}</h3>
      </div>
      <div className="links">
        <ul> 
            <li><Link to="/">Home</Link></li>
            <li><Link to="/expenses">Expense List</Link></li>
        </ul>
      </div>
      <button className="logout-button" onClick={() => signOut(auth)}>Logout</button>
    </div>
  );
}

export default Sidebar;