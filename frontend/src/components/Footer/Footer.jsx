import React from 'react'
import './Footer.css';
import { assets } from '../../assets/assets';
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-right">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate voluptas totam dolorum tempora facere. Quibusdam, molestias. Beatae, laudantium natus consectetur rerum at, commodi sequi vitae itaque repellat corporis quod ducimus.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-left">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-242-243-4903</li>
                    <li>company@example.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>© Copyright 2024 Example.com. All rights reserved.</p>
    </div>
  )
}

export default Footer