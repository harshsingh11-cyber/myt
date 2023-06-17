import React, { useContext } from 'react';
import { SearchContext } from './SearchContext';
import './Property.css';

function Property() {
    // just here get data from context and just print or display data
    const { page } = useContext(SearchContext);
    console.log("about ", page.data.data);
    return (
        <div className='property_d'>
            <h1>Property Details</h1>
            <div className="pro_second">
                <div className="images">
                    <img src={page.data.data.propertyImage.fullUrl} alt="" />
                </div>
                <div className='newone'>
                <div className="contains">
                    <h2 className='h2'>{page.data.data.propertyName} - { page.data.data.propertyStar} ⭐</h2>
                    <p className='p'>{page.data.data.propertyAddress.street}  <strong>{page.data.data.propertyAddress.city} {page.data.data.propertyAddress.state}</strong></p>
                </div>
                <div className="contains_second">
                  <p className='p'>{page.data.data.propertyType}</p>
                  <a className='p' href={page.data.data.propertyWebsiteUrl}>Property-site</a>
                </div>
                </div>
                
            </div>
        </div>
    )
}

export default Property
