import React, { useState } from 'react';

export default function ReservationForm () {
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    
    const handleDateChange = (e) => {
        setDate(e.target.value);
    };
    
    const handleTimeChange = (e) => {
        setTime(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    
    return (
    <form onSubmit={handleSubmit}>
        <h1>Reservation Form</h1>
        <label>Email
            <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <label>Date
            <input type="date" value={date} onChange={handleDateChange} />
        </label>
        <label>Time
            <input type="time" value={time} onChange={handleTimeChange} />
        </label>
        <button type="submit">Submit</button>
        </form>
    );
};