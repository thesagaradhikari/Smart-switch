import React, { useState, useEffect } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Update the time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setCurrentDate(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
    }, 1000);

    // Set greeting based on time of day
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting('Good Morning');
    } else if (hours < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="dashboard-container">
      {/* Greeting Message */}
      <div className="greeting-message">
        <h2>{greeting}!</h2>
        <p>{currentDate} - {currentTime}</p>
      </div>
    </div>
  );
}

export default Dashboard;
