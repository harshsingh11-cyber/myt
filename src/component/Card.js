import React from 'react';
import './Card.css';
import { useNavigate } from 'react-router-dom';
import  { useContext } from 'react';
import { SearchContext } from './SearchContext';
import { useState} from 'react';
import axios from 'axios';
function Card({name,imgn,price,star,type,code}) {

    const [v1, setV1] = useState();
    const { upDatepage } = useContext(SearchContext);
    const navigate = useNavigate();


    async function pageloader(el) {
        console.log(el);
        try {
          const response = await axios.post(
            'https://api.mytravaly.com/testing/v1/',
            {
              action: "getPropertyDetails",
              getPropertyDetails: {
                propertyCode: `${el}`
              }
            },
            {
              headers: {
                authtoken: '7eaa8958a9f8047951d1ef23348abc3f',
                visitortoken: 'da71-d7c1-9952-9b98-dc62-3f0a-0ddd-a65e',
                'Content-Type': 'application/json',
              },
            }
          );
    
          setV1(response);
          upDatepage(response);
          navigate('/property');
          console.log("data", v1);
        } catch (error) {
          console.error(error);
        }
      }

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
                    <button onClick={() => pageloader(code)} className='btn-1'>Book-Now</button>
                </div>
            </div>
        </div>
    )
}

export default Card
