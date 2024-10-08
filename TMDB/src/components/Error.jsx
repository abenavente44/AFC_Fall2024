// Error.js
import React from 'react';
//import 'index.css'; // Create a separate CSS file for styling

const Error = ({ message }) => {
  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>{message}</p>
      <img src="./assets/notfound.jpg" alt="Sad face" className="error-image" /> {/* You can use any image */}
      <button onClick={() => window.location.reload()} className="retry-button">Try Again</button>
    </div>
  );
};

export default Error;
