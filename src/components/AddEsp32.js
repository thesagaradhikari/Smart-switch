import React, { useState } from 'react';

const AddEsp32 = () => {
  const [esp32Data, setEsp32Data] = useState({ name: '', description: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEsp32Data({ ...esp32Data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle ESP32 data submission
    console.log('ESP32 Data Submitted:', esp32Data);
  };

  return (
    <div>
      <h2>Add ESP32</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="ESP32 Name"
          value={esp32Data.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={esp32Data.description}
          onChange={handleChange}
          required
        />
        <button type="submit">Add ESP32</button>
      </form>
    </div>
  );
};

export default AddEsp32;
