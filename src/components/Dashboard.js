import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [temperature, setTemperature] = useState(20);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    
    // Redirect to login page using React Router
    navigate('/login');
  };

  const increaseTemperature = () => setTemperature((prev) => prev + 1);
  const decreaseTemperature = () => setTemperature((prev) => prev - 1);

  return (
    <div className="dashboard-container">
      {/* Top Navigation Bar */}
      <div className="navbar">
        <h1>Smart Home</h1>
        <nav>
          <button onClick={() => navigate('/living-room')} className="nav-button">Living Room</button>
          <button onClick={() => navigate('/bedroom')} className="nav-button">Bedroom</button>
          <button onClick={() => navigate('/kitchen')} className="nav-button">Kitchen</button>
        </nav>

        {/* Profile and Logout */}
        <div className="profile-section">
          <div className="profile-info">
            <img
              src="https://via.placeholder.com/50"
              alt="User Avatar"
              className="profile-avatar"
            />
            <span className="profile-name">John Doe</span>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="dashboard-main">
        {/* Left Panel */}
        <div className="glass-panel">
          <div className="widget">
            <h2>Device Control</h2>
            <p>Control your home appliances efficiently.</p>
            <button className="device-button">Toggle Lights</button>
          </div>
          <div className="widget">
            <h2>Power Consumption</h2>
            <div className="graph">Graph Placeholder</div>
          </div>
        </div>

        {/* Center Panel */}
        <div className="glass-panel">
          <div className="widget">
            <h2>Appliance Timer</h2>
            <p>Set timers for your kitchen appliances.</p>
          </div>
          <div className="widget">
            <h2>Energy Usage</h2>
            <div className="graph">Graph Placeholder</div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="glass-panel thermostat">
          <h2>Thermostat</h2>
          <div className="thermostat-circle">{temperature}°C</div>
          <div className="thermostat-control">
            <button onClick={decreaseTemperature}>-</button>
            <button onClick={increaseTemperature}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;