// ManagerComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Style.css'; // Import CSS file
import DatabaseComponent from './DatabaseComponent';

const ManagerComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [ratingInput, setRatingInput] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://6570054809586eff66409716.mockapi.io/apis');
        setEmployees(response.data);
      } catch (error) {
        setError(error);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleRatingInputChange = (e) => {
    setRatingInput(e.target.value);
  };

  const handleEmployeeSelect = (id) => {
    setSelectedEmployeeId(id);
  };

  const handleUpdateRating = async () => {
    if (!selectedEmployeeId) {
      alert('Please select an employee.');
      return;
    }

    if (!ratingInput.trim() || isNaN(ratingInput) || ratingInput < 1 || ratingInput > 5) {
      alert('Please enter a valid rating between 1 and 5.');
      return;
    }

    try {
      await axios.put(`https://6570054809586eff66409716.mockapi.io/apis/${selectedEmployeeId}`, {
        rating: parseInt(ratingInput)
      });
      alert('Rating updated successfully');
      // Refresh employee data after rating update
      const response = await axios.get('https://6570054809586eff66409716.mockapi.io/apis');
      setEmployees(response.data);
    } catch (error) {
      setError(error);
      console.error('Error updating rating:', error);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="manager-container"> {/* Apply manager container class */}
      <h2 className="manager-header">Manager Dashboard</h2>
      <div>
        <label className="select-label">Select Employee by ID:</label>
        <select value={selectedEmployeeId} onChange={(e) => handleEmployeeSelect(e.target.value)} className="employee-dropdown"> {/* Apply employee dropdown class */}
          <option value="">Select Employee</option>
          {employees.map(employee => (
            <option key={employee.id} value={employee.id}>
              {employee.name} ({employee.id})
            </option>
          ))}
        </select>
      </div>
      {selectedEmployeeId && (
        <div>
          <label className="rating-label">Enter Rating (1-5):</label>
          <input type="number" min="1" max="5" value={ratingInput} onChange={handleRatingInputChange} className="rating-input" /> {/* Apply rating input class */}
          <button onClick={handleUpdateRating} className="update-btn">Update Rating</button> {/* Apply update button class */}
        </div>
      )}

      <DatabaseComponent/>
    </div>
  );
};

export default ManagerComponent;
