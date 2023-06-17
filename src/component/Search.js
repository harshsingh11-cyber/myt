import React from 'react';
import './Search.css';
import {
  faCalendarDays,
  faLocationDot,
  faPerson,

} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import axios from 'axios';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import  { useContext } from 'react';
import { SearchContext } from './SearchContext';


function Search() {

   // Retrieve the updateSearchResults function from the SearchContext
  const { updateSearchResults } = useContext(SearchContext);
  const navigate = useNavigate();

 // State variables for search inputs, suggestions, selected item, search data, and search results
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [item,setItem] = useState('');
  const [searchData, setSearchdata] = useState([]);
  const [val, setVal] = useState([]);

  // State variables for date range selector
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      key: "selection",
    },
  ]);

// State variables for options selector
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });


    // Function to handle the search input change and fetch suggestions
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

// call the api and get the result bassed on input 
  const handleInputChange = async (event) => {
    const value = event.target.value;
    setSearchText(value);

    // check the length of input for hiting the api
    if (value.length >= 3) {
      try {
        const response = await axios.post(
          'https://api.mytravaly.com/testing/v1/',
          {
            action: "searchAutoComplete",
            searchAutoComplete: {
              inputText: value,
              searchType: [
                "byCity",
                "byState",
                "byCountry",
                "byRandom",
                "byPropertyName"
              ],
              limit: 10
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

        setSuggestions(response.data.data.autoCompleteList.byPropertyName.listOfResult);
        console.log("suggestion data : - ", suggestions);
      } catch (error) {
        console.error(error);
      }
    } else {
      setSuggestions([]);
    }
  };

  async function handleSearch() {
    console.log("clicked search");
    try {
      const response = await axios.post(
        'https://api.mytravaly.com/testing/v1/',
        {
          action: "searchAutoComplete",
          searchAutoComplete: {
            inputText: searchText,
            searchType: [
              "byCity",
              "byState",
              "byCountry",
              "byRandom",
              "byPropertyName"
            ],
            limit: 10
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
      setSearchdata(response.data.data);
      // updateSearchResults(response.data.data);
      console.log("suggestion data : - ", searchData);
      // navigate('/sea');
    } catch (error) {
      console.error(error);
    }
  }

//for search button handle
  async function searchLoc() {
   
    console.log("clicked");

    const searchCriteria = {
      checkIn: "2023-07-11",
      checkOut: "2023-07-12",
      rooms: 2,
      adults: 2,
      children: 0,
      searchType: "hotelIdSearch",
      searchQuery: [item],
      accommodation: [
        "all",
        "hotel",
      ],
      arrayOfExcludedSearchType: ["street"],
      highPrice: "3000000",
      lowPrice: "0",
      limit: 5,
      preloaderList: [],
      currency: "INR",
      rid: 0,
    };


    try {
      const response = await axios.post(
        "https://api.mytravaly.com/testing/v1/",
        {
          action: "getSearchResultListOfHotels",
          getSearchResultListOfHotels: {
            searchCriteria,
          },
        },
        {
          headers: {
            authtoken: "7eaa8958a9f8047951d1ef23348abc3f",
            visitortoken: "da71-d7c1-9952-9b98-dc62-3f0a-0ddd-a65e",
            "Content-Type": "application/json",
          },
        }
      );

      setVal(response.data.data.arrayOfHotelList);
      updateSearchResults(response.data);
      console.log(val);

        navigate('/sea');
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  }
  return (
    <div>
      <div className="headerSearch">
        <div className="headerSearchitem">
          <FontAwesomeIcon icon={faLocationDot} className="headerIcon" />
          <input type="text" placeholder='where are you going' value={searchText}
            className='headerSearchInput'
            onChange={handleInputChange} />
          {
            <div className='harsh'>
              <ul>
                {
                  suggestions.map((elm) => {
                    return (
                      <li key={elm.searchArray.query[0]} onClick={() =>{ setSearchText(elm.valueToDisplay); setItem(elm.searchArray.query[0])}}> {elm.valueToDisplay} </li>
                    )
                  })
                }
              </ul>
            </div>
          }
        </div>

        <div className="headerSearchitem" onClick={() => setOpenDate(!openDate)}>
          <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
          <span className='headerSerchDate'>
            {
              `${format(date[0].startDate, "yyyy/MM/dd")} to ${format(
                date[0].endDate,
                "yyyy/MM/dd"
              )}`
            }
          </span>
          {openDate && (
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={date}
              className="date"
              minDate={new Date()}
            />
          )}
        </div>
        <div className="headerSearchitem" onClick={() => setOpenOptions(!openOptions)}>
          <FontAwesomeIcon icon={faPerson} className="headerIcon" />
          <span className='headerSerchDate'     >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
          {openOptions && (
            <div className="options">
              <div className="optionItem">
                <span className="optionText">Adult</span>
                <div className="optionCounter">
                  <button
                    disabled={options.adult <= 1}
                    className="optionCounterButton"
                    onClick={() => handleOption("adult", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">
                    {options.adult}
                  </span>
                  <button
                    className="optionCounterButton"
                    onClick={() => handleOption("adult", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="optionItem">
                <span className="optionText">Children</span>
                <div className="optionCounter">
                  <button
                    disabled={options.children <= 0}
                    className="optionCounterButton"
                    onClick={() => handleOption("children", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">
                    {options.children}
                  </span>
                  <button
                    className="optionCounterButton"
                    onClick={() => handleOption("children", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="optionItem">
                <span className="optionText">Room</span>
                <div className="optionCounter">
                  <button
                    disabled={options.room <= 1}
                    className="optionCounterButton"
                    onClick={() => handleOption("room", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">
                    {options.room}
                  </span>
                  <button
                    className="optionCounterButton"
                    onClick={() => handleOption("room", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="search_btn">
          <button className="headerBtn" onClick={searchLoc}>
            Search

          </button>
        </div>

      </div>
      {/* <div>
        {
          searchData ? (  searchData.map((stay) => (
            <Card name={stay.propertyName} imgn={stay.propertyImage} altt={stay.propertyName} price={stay.staticPrice.amount} />
          ))) : ""
        }
      </div> */}

    </div>
  )
}

export default Search
