import axios from 'axios';
import React, { useEffect, useState } from 'react';

const API_URL = "https://6570054809586eff66409716.mockapi.io/apis";

const TimeSheetApp = () => {
  const [employees, setEmployees] = useState([]);
  const [timeSheetData, setTimeSheetData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    axios.get(`${API_URL}/employees`)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => console.log("Error: ", error));
  }, []);

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    axios.get(`${API_URL}/timesheets?employeeId=${employee.id}`)
      .then((res) => {
        setTimeSheetData(res.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const submitReview = () => {
    axios.post(`${API_URL}/ratings`, {
      employeeId: selectedEmployee.id,
      rating: rating
    })
      .then((response) => {
        console.log("Rating submitted successfully", response.data);
        // Here you may want to update UI or perform further actions
      })
      .catch(error => {
        alert("Something went wrong! Please try again.");
        console.error('Error:', error);
      });
  };

  const handlerRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  return (
    <div>
      <h1>Time Sheet Application</h1>
      <label>Select Employee:</label>
      <select onChange={(e) => handleEmployeeSelect(JSON.parse(e.target.value))} >
        <option value="">Select an employee</option>
        {employees.map(employee => (
          <option key={employee.id} value={JSON.stringify(employee)}>{employee.name}</option>
        ))}
      </select>

      {selectedEmployee && (
        <div>
          <h2>Time Sheet for {selectedEmployee.name}</h2>
          <p>Date: {timeSheetData.date ? timeSheetData.date : "Not Available"}</p>
          <table className='table'>
            <thead>
              <tr>
                <th scope="col">Task Description</th>
                <th scope="col" colSpan="3">Hours Worked</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Task 1</td>
                <td colSpan="3">{timeSheetData.task1Hours || "Not Available"}</td>
              </tr>
              <tr>
                <td>Task 2</td>
                <td colSpan="3">{timeSheetData.task2Hours || "Not Available"}</td>
              </tr>
              <tr>
                <td>Task 3</td>
                <td colSpan="3">{timeSheetData.task3Hours || "Not Available"}</td>
              </tr>
            </tbody>
          </table>
          <label>Rate Employee 1-5 :</label>
          <input type="number" min='1' max='5' onChange={handlerRatingChange} />
          <button onClick={submitReview} disabled={!rating}>Submit Rating</button>
        </div>
      )}
    </div>
  );
};

export default TimeSheetApp;
