import React, { useContext, useState } from 'react';
import { SearchContext } from './SearchContext';
import Hotel from './Hotel';
import './Loc.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Location() {

  // navigate for re direct the page
  const navigate = useNavigate();

  // context data using in components
  const { searchResults, upDatepage } = useContext(SearchContext);
  console.log("harsh");
  console.log(searchResults);
  console.log(searchResults.data.arrayOfHotelList);

  const [v1, setV1] = useState();

  // function for particuler page or hotel
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
    <div className='location'>
      <h1>
        Hotel hotels
      </h1>
      {searchResults &&
        searchResults.data &&
        searchResults.data.arrayOfHotelList.map((stay) => (
          <Hotel
            key={stay.propertyId}
            name={stay.propertyName}
            image={stay.propertyImage.fullUrl}
            price={stay.propertyMinPrice.amount}
            type={stay.propertytype}
            star={stay.propertyStar}
            room={stay.roomName}
            page={pageloader}
            code={stay.propertyCode}
          />
        ))}
    </div>
  )
}

export default Location


