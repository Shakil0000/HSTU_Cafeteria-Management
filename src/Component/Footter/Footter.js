import React from 'react';
import './Footer.css';
import { FaLocationDot } from "react-icons/fa6";
import { FaBuffer } from "react-icons/fa6";
import { IoLogoAndroid } from "react-icons/io";
import { IoMdAppstore } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footter = () => {
    return (
        <div className='Fottercointainer'>
       
                <div className='footeritem'>
                <h4><FaLocationDot />Adreess</h4>
                <p>Hstu,Dinajpur</p>
                <p>Bangladesh</p>
                </div>

                <div className='footeritem'>
                <h4><FaBuffer />Features</h4>
                <p><IoLogoAndroid/> Get App</p>
                <p><IoMdAppstore/> Visit us</p>
                </div>

                <div className='footeritem'>
                <h4>Contact us</h4>
                <p><FaWhatsapp/> +5874587456874</p>
                <p>Visitn : <FaFacebook/> <FaXTwitter/> <MdEmail/> hstu@hstu.ac.bd</p>
                </div>
            
        
        </div>
        
       
    );
};

export default Footter;