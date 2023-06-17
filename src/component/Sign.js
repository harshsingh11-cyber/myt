import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from './Input';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase";

function Sign() {

    const navigate = useNavigate();


    const [value, setValue] = useState({
        name: "",
        email: "",
        pass: "",
    });

const [sub,setBub] = useState(false);
const [errorMSG,setError] = useState("");

    const submitNow = () => {
        console.log(value);
        if(!value.name || !value.email || !value.pass){
            setError("Fill all Feilds");
            return;
        }
        setError("");
        setBub(true);
        createUserWithEmailAndPassword(auth,value.email,value.pass).then(
            (res) => {console.log(res);
                const user = res.user;
                console.log(user);
                navigate('/');
            }

        ).catch((err)=> {console.log("Error = " , err); setError(err.message)});
        setBub(false);
    }



    return (
        <div className='login__container'>
            <div className="login__innerbox">
                <h1 className="login__heading">Sign - Up</h1>
                <Input label="Name " placeholder="Enter Name......" onChange={(e) => setValue((prev) => ({ ...prev, name: e.target.value }))} />
                <Input label="Email" placeholder="Enter email address......" onChange={(e) => setValue((prev) => ({ ...prev, email: e.target.value }))} />
                <Input label="Password" placeholder="Enter Password......" onChange={(e) => setValue((prev) => ({ ...prev, pass: e.target.value }))} />
                


                <div className="login__footer">
                    <b className='error'> {errorMSG}</b>
                    <button onClick={submitNow} disabled={sub}>Sign-up</button>
                    <p>
                        Already have an account? <span>

                            <Link to='/login'>Log-In</Link></span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Sign
