import React, { useContext, useState } from 'react'
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import axios from "axios";
import { StoreContext } from '../../context/StoreContext';
const LoginPopup = ({setShowLogin}) => {
    const [currentState,setCurrentState] = useState('Login');
    const {url, setToken, token} = useContext(StoreContext);
    const [data, setData] = useState({
        name:"",
        email:"",
        password:""
    });

    const onChangeHandler = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setData(data=>({...data,[name]:value}));
    }
    
    const OnLogin = async(e)=>{
        e.preventDefault();
        let newUrl = url;
        if(currentState === "Login"){
            newUrl+="/api/user/login";
        }else{
            newUrl+="/api/user/register";
        }

        const response = await axios.post(newUrl,data);
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setShowLogin(false);
            
        }else{
            alert(response.data.message);
        }

    }
  return (
    <div className='login-popup'>
        <form className='login-popup-container' onSubmit={OnLogin}>
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currentState==="Sign Up"?<input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />:<></>}
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Your Email' required/>
                <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Password' required />
            </div>
            <button type='submit'>{currentState === "Sign Up"?"Create an account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox"  required />
                <p>By continuing, i agree to the term of use & privacy policy</p>
            </div>
            
            {currentState === "Login"?<p>Create a new account ?
                <span onClick={()=>setCurrentState("Sign Up")}>Click here</span></p>
                :
                <p>Already have account ? <span onClick={()=>setCurrentState('Login')}>Login here</span></p>
            }
            
            
        </form>
    </div>
  )
}

export default LoginPopup