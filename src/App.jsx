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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  },[]);
  // This is the main App component that renders the ExpenseForm component
  const [expenses, setExpenses] = useState(()=>{
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved):[];
  });

  useEffect(()=>{
    localStorage.setItem("expenses",JSON.stringify(expenses))
  },[expenses]);

  const handleAddExpense = (expense) => {
    // Function to handle adding a new expense
    setExpenses(prevExpenses => [...prevExpenses, expense]);
  };
  const handleDeleteExpense  = (id) => {
    // Function to handle deleting an expense
    setExpenses(prevExpenses => prevExpenses.filter(e => e.id !== id));
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
