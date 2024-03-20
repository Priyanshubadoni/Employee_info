// DatabaseComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Style.css'; // Import CSS file

const DatabaseComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://6570054809586eff66409716.mockapi.io/apis');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="database-container"> {/* Apply database container class */}
      <h2 className="database-header">Database Data</h2> {/* Apply database header class */}
      <table className="data-table"> {/* Apply data table class */}
        <thead>
          <tr>
            <th>Object ID</th>
            <th>Name</th>
            <th>Project</th>
            <th>Email</th>
            <th>Employee task</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.project}</td>
              <td>{item.email}</td>
              <td>{item.mytask}</td>
              <td>{item.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DatabaseComponent;
