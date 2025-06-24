import React from 'react';
import { useEffect, useState } from 'react';
import './DailyTip.css'
import { FaLightbulb } from 'react-icons/fa';

function DailyTip(){
    const [tip, setTip] = useState('');
    const [loading, setLoading] = useState(true);
    const URL = 'https://api.adviceslip.com/advice';
    useEffect(()=>{
        const fetchTip = async () =>{
            try{
                const response = await fetch(URL);
                const data = await response.json();
                setTip(data.slip.advice);
            }
            catch {
                setTip("Failed to load tip");
            }
            finally {
                setLoading(false);
            }
        };

        fetchTip();
    },[]);
    return (
        <div className= 'daily-tip-card'>
            <FaLightbulb className="tip-icon" />
            <div className="tip-content">
                {loading ? 'Loading tip...' : <p><strong>Tip of the Day:</strong> {tip}</p>}
            </div>
        </div>
    )
}

export default DailyTip;
