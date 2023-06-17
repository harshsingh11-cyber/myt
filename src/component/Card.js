import React from 'react';
import './Card.css';


function Card({name,imgn,price,star,type}) {
    return (
        <div className='main_card'>
            <div className='card'>
                <div className="card_first">
                    <img src={imgn} alt="" />
                </div>
                <div className="second">
                  <h2> { name }
                    -  
                    { star } ⭐ </h2>  
                    <p>{type}</p>
                </div>
                <div className="two_item">
                    <h3> Price :- {price} /-</h3>
                    <button className='btn-1'>Book-Now</button>
                </div>
            </div>
        </div>
    )
}

export default Card
