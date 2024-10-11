
import React from 'react'
import "../index.css"

const Error = ({ message }) => {
  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>{message}</p>
      <img src="./assets/notfound.jpg" alt="" className="error-image" />  
      <button onClick={() => window.location.reload()} className="retry-button">Try Again</button>
    </div>
  );
};

export default Error;
