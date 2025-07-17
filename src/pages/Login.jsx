import React, {useState} from 'react';
import {auth} from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from "firebase/auth";
import './Login.css'



function Login(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
      
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            if(isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                alert('Logged in!');
                navigate('/');
            }
            else {
                await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(auth.currentUser, { displayName: name });
                alert('Account created!')
                navigate('/');
            }
        }
        catch (error) {
            alert(error.message);
        }
    }
    return(
        <div className='login-page'>
            <div className='auth-container'>
                <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                <form onSubmit={handleSubmit} className='auth-form'>
                    {!isLogin && (
                        <input
                        type="text"
                        placeholder="Display Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                    )}
                    <input
                        type= "email"
                        placeholder='Email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type= "password"
                        placeholder='Password (6+ chars)'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button type='submit'>{isLogin ? 'Login' : 'Sign Up'}</button>
                </form>
                <p onClick={() => setIsLogin(!isLogin)} className='toggle-auth'>
                    {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
                </p>
            </div>
        </div>
    );
}

export default Login;