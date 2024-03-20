// EmployeeComponent.js
import React, { useState } from 'react';
import axios from 'axios';
import './Style.css'; // Import CSS file
import DatabaseComponent from './DatabaseComponent';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    project: '',
    email: '',
    mytask: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://6570054809586eff66409716.mockapi.io/apis', formData);
      alert('Data submitted successfully');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="container-fluide">
      <div className="col"><div className="form-container"> {/* Apply form container class */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="form-input" />
        <input type="text" name="project" placeholder="Project" value={formData.project} onChange={handleChange} className="form-input" />
        <input type="text" name="mytask" placeholder="Mytask" value={formData.mytask} onChange={handleChange} className="form-input" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="form-input" />
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div></div>
      <div className="col">
      <DatabaseComponent/>
      </div>
    </div>
  );
};

export default EmployeeForm;
