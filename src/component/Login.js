import React, { useState } from 'react'
import Input from './Input';
import './Login.css';
import { Link,useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase";


function Login() {
    const navigate = useNavigate();
    const [value, setValue] = useState({
        email: "",
        pass: "",
    });
    const [errorMSG, setError] = useState("");
    const submitNow = () => {
        if (!value.email || !value.pass) {
            setError("Fill all Feilds");
            return;
        }
        setError("");

        signInWithEmailAndPassword(auth, value.email, value.pass).then(
            (res) => {
                // console.log(res);
                // const user = res.user;
                // console.log(user);
                navigate('/');
            }

        ).catch((err) => { console.log("Error = ", err); setError(err.message) });
       
    }
    return (
        <div className='login__container'>
            <div className="login__innerbox">
                <h1 className="login__heading">LogIn</h1>
                <Input label="Email" placeholder="Enter email address......" onChange={(e) => setValue((prev) => ({ ...prev, email: e.target.value }))}  />
                <Input label="Password" placeholder="Enter Password......" onChange={(e) => setValue((prev) => ({ ...prev, pass: e.target.value }))} />
                <div className="login__footer">
                    <b className='error'>{errorMSG} </b>
                    <button onClick={submitNow}>Login</button>
                    <p>
                        Don't have an account? <span>
                            <Link to='/signup'>Sign up</Link></span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login;
