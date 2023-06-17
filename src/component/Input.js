import React from 'react';
import './Input.css';


function Input(props) {
    return (
        <div className='input__container'>
            { props.label && <label> {props.label}</label>}
              <input type="text" {...props} />
        </div>
    )
}

export default Input
