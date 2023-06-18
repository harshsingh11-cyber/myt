import './App.css';
import Home from './component/Home';
import Navbar from './component/Navbar';
import Newlist from './component/Newlist';
import Search from './component/Search';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './component/Card';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import Sign from './component/Sign';
import Location from './component/Location';
import Property from './component/Property';
import Footer from './component/Footer';
import Foter from './component/Foter';

function App() {


  const [popularStays, setPopularStays] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://api.mytravaly.com/testing/v1/',
          {
            action: 'popularStay',
            popularStay: {
              limit: 10,
              entityType: 'Any',
              filter: {
                searchType: 'byRandom',
                searchTypeInfo: {
                  country: 'India',
                },
              },
            },
          },
          {
            headers: {
              authtoken: '7eaa8958a9f8047951d1ef23348abc3f',
              visitortoken: 'da71-d7c1-9952-9b98-dc62-3f0a-0ddd-a65e',
              'Content-Type': 'application/json',
            },
          }
        );

        setPopularStays(response.data.data);
      } catch (error) {
        console.error('Error fetching popular stays:', error);
      }
    };

    fetchData();
  }, []);

  console.log(popularStays);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element=
            {
              <>
                <Navbar />
                <Home />
                <Search />
                <Newlist />
                {/* <Card /> */}
                <div className='stay'>
                  {
                    popularStays.map((stay) => (
                      <Card name={stay.propertyName} imgn={stay.propertyImage} altt={stay.propertyName} price={stay.staticPrice.amount} star={stay.propertyStar} type={stay.propertyType}  code={stay.propertyCode}/>
                    ))
                  }
                </div>
                <Footer />
                <Foter />
              </>}
          ></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Sign />}></Route>
          <Route path='/sea' element={<Location />}></Route>
          <Route path='/property' element={<Property />}></Route>
        </Routes>
      </BrowserRouter>
    </div >
    // path for all components 
  );
}

export default App;

