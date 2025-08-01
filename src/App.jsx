import React, { useEffect } from 'react';
import {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Home from './pages/Home';
import Expenses from './pages/Expenses';
import './App.css';
import Login from './pages/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { signOut } from "firebase/auth";


function App() {
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading]  = useState(true);
  

  useEffect(() => {
    if (!user) return;

    let timer;
    const logoutAfterInactivity = () => {
      signOut(auth);
      alert("You have been logged out due to inactivity.");
    };

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(logoutAfterInactivity, 2 * 60 * 1000);
    };

    const events = ['mousemove', 'keydown', 'click'];
    events.forEach(e => window.addEventListener(e, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timer);
      events.forEach(e => window.removeEventListener(e, resetTimer));
    };
  }, [user]);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setTimeout(() => setLoading(false), 400);
      if (currentUser) {
        try {
          const url = `https://dslifoo4mg.execute-api.us-east-2.amazonaws.com/expense?userId=${currentUser.uid}`;
          const response = await fetch(url);
          const data = await response.json();
  
          if (response.ok) {
            setExpenses(data.expenses);
            console.log('Fetched from AWS:', data.expenses);
          } else {
            console.error('Error fetching expenses:', data);
          }
        } catch (err) {
          console.error('Network error:', err);
        }
      }
    });
  
    return () => unsubscribe();
  }, []);

  const handleAddExpense = async (expense) => {
    try {
      const user = auth.currentUser;
  
      if (!user) {
        alert('You must be logged in to add expenses.');
        return;
      }
  
      const expenseWithUser = {
        ...expense,
        userId: user.uid
      };
  
      const response = await fetch('https://dslifoo4mg.execute-api.us-east-2.amazonaws.com/expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(expenseWithUser)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setExpenses(prev => [...prev, data.data]);
        console.log('Saved to AWS:', data);
      } else {
        console.error('Error from Lambda:', data);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  
  const handleDeleteExpense = async (expenseId) => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      const response = await fetch('https://dslifoo4mg.execute-api.us-east-2.amazonaws.com/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          expenseId: expenseId
        })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setExpenses(prev => prev.filter(e => e.expenseId !== expenseId));
        console.log("Deleted from AWS:", data);
      } else {
        console.error("Lambda error:", data);
      }
  
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p className="loading-text">Launching your dashboard...</p>
      </div>
    );
  }
  return (
    <div className='app-container'>
      {user && <Sidebar user={user} />}
      <div className = "container">
      <Routes>
        <Route path="/login" element={<Login />} />
        {user && (
          <>
            <Route path="/" element={<Home expenses={expenses} onAddExpense={handleAddExpense} onDeleteExpense={handleDeleteExpense} />} />
            <Route path="/expenses" element={<Expenses expenses={expenses} onDeleteExpense={handleDeleteExpense} />} />
          </>
        )}
        {!user && <Route path="*" element={<Login />} />}
      </Routes>
      </div>
    </div>
  );
}

export default App;
