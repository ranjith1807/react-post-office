import React, { useState } from 'react';
import './App.css'; 

function App() {
  const [pincode, setPincode] = useState('');
  const [pincodeData, setPincodeData] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filterText, setFilterText] = useState('');
  const [isFetched, setIsFetched] = useState(false);

  const handleLookup = async () => {
    // Error Handling: Check if the input is exactly 6 digits
    if (pincode.length !== 6 || isNaN(pincode)) {
      setError('Please enter a valid 6-digit Pincode.');
      return;
    }

    // Reset previous states
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();

      // Error Handling: Handle API level errors (e.g., invalid pincode format passed)
      if (data[0].Status === 'Error') {
         setError(data[0].Message || 'Error fetching data. Pincode might be invalid.');
         setIsFetched(false);
      } else {
         setPincodeData(data[0].PostOffice);
         setMessage(data[0].Message);
         setIsFetched(true);
      }
    } catch (err) {
      setError('An error occurred while fetching the data from the API.');
    } finally {
      setLoading(false);
    }
  };

  // Real-time filter functionality
  const filteredData = pincodeData?.filter((office) =>
    office.Name.toLowerCase().includes(filterText.toLowerCase())
  ) || [];

  return (
    <div className="app-container">
      {!isFetched ? (
        // UI: Before clicking the button
        <div className="search-section">
          <h2>Enter Pincode</h2>
          <input
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            maxLength={6}
            className="pincode-input"
          />
          <br />
          <button onClick={handleLookup} className="lookup-btn">
            Lookup
          </button>
          
          {error && <p className="error-text">{error}</p>}
          {loading && <div className="loader"></div>}
        </div>
      ) : (
        // UI: After clicking the button
        <div className="results-section">
          <h2>Pincode: {pincode}</h2>
          <p className="message-text"><strong>Message:</strong> {message}</p>
          
          <div className="filter-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Filter"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="filter-input"
            />
          </div>

          {/* Error Handling: Empty filter result */}
          {filteredData.length === 0 ? (
            <p className="error-text">Couldn’t find the postal data you’re looking for…</p>
          ) : (
            <div className="grid-container">
              {filteredData.map((office, index) => (
                <div key={index} className="card">
                  <p>Name: {office.Name}</p>
                  <p>Branch Type: {office.BranchType}</p>
                  <p>Delivery Status: {office.DeliveryStatus}</p>
                  <p>District: {office.District}</p>
                  <p>Division: {office.Division}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;