import React from 'react';
import './Hotel.css';

function Hotel({ name, image, price, type, room, star, page, code }) {

  // here we make component and reuse this component
  return (
    <div className="card12">
      <img src={image} alt={name} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{name} - {star}</h2>
        <div className="new-card">
          <p>
            {type}
          </p>
          <p>
            {room}
          </p>
        </div>
        <p className="card-price"> Price :- {price}/-</p>
        <button className="card-button" onClick={() => page(code)}>
          Book - Now
        </button>
      </div>
    </div>
  );
};
export default Hotel
