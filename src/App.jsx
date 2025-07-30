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


function App() {
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
  
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
  
  const handleDeleteExpense  = (id) => {
    // Function to handle deleting an expense
    setExpenses(prevExpenses => prevExpenses.filter(e => e.expenseId !== id));
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
