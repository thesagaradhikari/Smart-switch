import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from "./Navbar";
import { toast, ToastContainer } from 'react-toastify';
import "./Dashboard.css";
import 'react-toastify/dist/ReactToastify.css'; // Ensure this is at the top

// Local Storage Keys
const STORAGE_KEYS = {
  ESP32_DEVICES: 'esp32_devices',
  THEME: 'dashboard_theme',
  USER_PREFERENCES: 'user_preferences'
};

// Custom hook for persistent storage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      toast.error('Failed to load data. Please try again.'); // Error feedback
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      toast.error('Failed to save data. Please try again.'); // Error feedback
    }
  };

  return [storedValue, setValue];
};

const DeviceCard = ({ device, isLoading, onSwitchToggle, onEditSwitchLabel, onDeleteDevice }) => (
  <div className="esp32-device">
    <div className="device-header">
      <h3>{device.name}</h3>
      <div className="device-status">
        <span className={`status-indicator ${device.isOnline ? '' : 'offline'}`} />
        <span>{device.isOnline ? 'Online' : 'Offline'}</span>
      </div>
    </div>

    <div className="switches">
      {device.switches.map((state, index) => (
        <div key={index} className="switch">
          <input
            type="text"
            value={device.switchLabels[index]}
            onChange={(e) => onEditSwitchLabel(device.id, index, e.target.value)}
            className="switch-label-input"
            aria-label={`Switch label for ${device.name} - Switch ${index + 1}`}
          />
          <button
            className={`switch-btn ${state ? "on" : "off"}`}
            onClick={() => onSwitchToggle(device.id, index)}
            disabled={!device.isOnline || isLoading}
            aria-label={`Toggle switch ${index + 1} for ${device.name}`}
          />
          <span className="switch-label">{state ? 'ON' : 'OFF'}</span>
        </div>
      ))}
    </div>

    <div className="device-footer">
      <span className="last-updated">
        Last updated: {new Date(device.lastUpdated).toLocaleString()}
      </span>
      <span className="last-status-check">
        Last status check: {new Date(device.lastStatusCheck).toLocaleString()}
      </span>
      <button
        onClick={() => onDeleteDevice(device.id)}
        className="delete-device-btn"
        disabled={isLoading}
        aria-label={`Delete device ${device.name}`}
      >
        Delete Device
      </button>
    </div>
  </div>
);

const NewWindow = ({ devices = [], onSwitchToggle, setSelectedDevice }) => (
  <div className="new-window">
    {devices.map(device => (
      <button key={device.id} onClick={() => setSelectedDevice(device)}>
        {device.name}
      </button>
    ))}
  </div>
);

const DashboardHome = () => {
  const [selectedDevice, setSelectedDevice] = useState(null); // State to track selected device
  const [esp32Devices, setEsp32Devices] = useLocalStorage(STORAGE_KEYS.ESP32_DEVICES, []);
  const [newDeviceName, setNewDeviceName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Simulated device status check
  useEffect(() => {
    const checkDeviceStatus = () => {
      setEsp32Devices(currentDevices =>
        currentDevices.map(device => ({
          ...device,
          isOnline: Math.random() > 0.1, // 90% chance of being online
          lastStatusCheck: new Date().toISOString()
        }))
      );
      toast.info('Device status updated'); // Notify user of status update
    };

    const interval = setInterval(checkDeviceStatus, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [setEsp32Devices]);

  const handleAddESP32 = () => {
    if (!newDeviceName.trim()) {
      toast.error("Please enter a valid device name");
      return;
    }

    setIsLoading(true);
    const newDevice = {
      name: newDeviceName.trim(),
      id: Date.now(),
      switches: Array(6).fill(false),
      isOnline: true,
      lastUpdated: new Date().toISOString(),
      lastStatusCheck: new Date().toISOString(),
      switchLabels: Array(6).fill('').map((_, i) => `Switch ${i + 1}`)
    };

    setEsp32Devices(prev => [...prev, newDevice]);
    setNewDeviceName("");
    setIsLoading(false);
    toast.success(`Device "${newDeviceName}" added successfully`);
    setSelectedDevice(newDevice); // Set the newly added device as selected
  };

  const handleSwitchToggle = async (deviceId, switchIndex) => {
    setEsp32Devices((currentDevices) => {
      const updatedDevices = currentDevices.map((device) => {
        if (device.id === deviceId) {
          const updatedSwitches = [...device.switches];
          updatedSwitches[switchIndex] = !updatedSwitches[switchIndex]; // Toggle the switch
          return { ...device, switches: updatedSwitches };
        }
        return device;
      });
      return updatedDevices;
    });
  toast.success(`Switch ${switchIndex + 1} toggled successfully`);
};


  const handleEditSwitchLabel = (deviceId, switchIndex, newLabel) => {
    setEsp32Devices(currentDevices =>
      currentDevices.map(device =>
        device.id === deviceId
          ? {
              ...device,
              switchLabels: device.switchLabels.map((label, index) =>
                index === switchIndex ? newLabel : label
              ),
            }
          : device
      )
    );
    toast.success(`Switch ${switchIndex + 1} label updated successfully`);
  };

  const handleDeleteDevice = (deviceId) => {
    setEsp32Devices(currentDevices =>
      currentDevices.filter(device => device.id !== deviceId)
    );
    toast.success(`Device deleted successfully`);
  };

  // Sample data for the graph
  const data = esp32Devices.map(device => ({
    name: device.name,
    lastUpdated: new Date(device.lastUpdated).toLocaleString(),
    isOnline: device.isOnline ? 1 : 0
  }));

  return (
    <div className="content-section">
      <h2>Smart Home Dashboard</h2>
      <div className="dashboard-home">
        <div className="left-column">
          {/* Display Switches for Selected Device */}
          {selectedDevice && (
            <DeviceCard
              key={selectedDevice.id}
              device={selectedDevice}
              isLoading={isLoading}
              onSwitchToggle={handleSwitchToggle}
              onEditSwitchLabel={handleEditSwitchLabel}
              onDeleteDevice={handleDeleteDevice}
            />
          )}
        </div>
        <div className="right-column">
          {/* Add Device Section */}
          <div className="add-device-section">
            <input
              type="text"
              value={newDeviceName}
              onChange={(e) => setNewDeviceName(e.target.value)}
              placeholder="Enter ESP32 Device Name"
              className="device-input"
              disabled={isLoading}
            />
            <button
              onClick={handleAddESP32}
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add ESP32'}
            </button>
          </div>
          {/* New Window Section */}
          {esp32Devices.length > 0 && (
            <NewWindow devices={esp32Devices} onSwitchToggle={handleSwitchToggle} setSelectedDevice={setSelectedDevice} />
          )}
        </div>
      </div>
      {/* Graph Section */}
      <h2>Device Status Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="isOnline" stroke="#4CAF50" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const Settings = () => {
  const [preferences, setPreferences] = useLocalStorage(STORAGE_KEYS.USER_PREFERENCES, {
    notifications: true,
    autoRefresh: true,
    refreshInterval: 30,
    theme: 'light',
    language: 'en'
  });

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
    toast.success('Settings updated successfully');
  };

  return (
    <div className="content-section">
      <h2>Settings</h2>
      <div className="settings-grid">
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={preferences.notifications}
              onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
            />
            Enable Notifications
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={preferences.autoRefresh}
              onChange={(e) => handlePreferenceChange('autoRefresh', e.target.checked)}
            />
            Auto Refresh
          </label>
        </div>
        <div className="setting-item">
          <label>
            Refresh Interval (seconds):
            <input
              type="number"
              value={preferences.refreshInterval}
              onChange={(e) => handlePreferenceChange('refreshInterval', parseInt(e.target.value))}
              min="5"
              max="300"
            />
          </label>
        </div>
        <div className="setting-item">
          <label>
            Theme:
            <select
              value={preferences.theme}
              onChange={(e) => handlePreferenceChange('theme', e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </label>
        </div>
        <div className="setting-item">
          <label>
            Language:
            <select
              value={preferences.language}
              onChange={(e) => handlePreferenceChange('language', e.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

const Profile = ({ onLogout }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useLocalStorage('user_profile', {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: null,
    role: 'admin'
  });

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // Clear all local storage
      Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
      onLogout();
      navigate('/login');
    }
  };

  const handleProfileUpdate = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
    toast.success('Profile updated successfully'); // Set feedback message
  };

  const handleAvatarUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result }));
        toast.success('Avatar updated successfully');
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('Failed to upload avatar');
    }
  };

  const handleFileChange = (e) => {
    handleAvatarUpload(e.target.files[0]);
  };

  return (
    <div className="content-section">
      <h2>Profile</h2>
      <div className="profile-info">
        <div className="avatar-section">
          <img
            src={profile.avatar || '/default-avatar.png'}
            alt="Profile"
            className="profile-avatar"
          />
          <label className="upload-avatar-btn" htmlFor="avatar-input">
            Upload New Avatar
          </label>
          <input
            id="avatar-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
        <div className="profile-details">
          <div className="profile-field">
            <label>Name:</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleProfileUpdate('name', e.target.value)}
            />
          </div>
          <div className="profile-field">
            <label>Email:</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => handleProfileUpdate('email', e.target.value)}
            />
          </div>
          <div className="profile-field">
            <label>Role:</label>
            <span className="role-badge">{profile.role}</span>
          </div>
        </div>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

function Dashboard({ onLogout }) {
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [preferences] = useLocalStorage(STORAGE_KEYS.USER_PREFERENCES, {
    theme: 'light',
    notifications: true
  });

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', preferences.theme);
  }, [preferences.theme]);

  return (
    <div className={`dashboard-container ${preferences.theme}`}>
      <Navbar
        collapsed={navCollapsed}
        onToggle={() => setNavCollapsed(!navCollapsed)}
      />
      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<DashboardHome />} /> {/* Home route to display switches */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile onLogout={onLogout} />} />
          <Route path="*" element={
            <div className="error-page">
              <h2>404 - Page Not Found</h2>
              <p>The page you're looking for doesn't exist.</p>
            </div>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;