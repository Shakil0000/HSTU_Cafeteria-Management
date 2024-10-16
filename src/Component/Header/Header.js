import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import hutufafe from "./hstucafe.jpg";
import  eatimage1 from "./eat1.jpeg";
import  eatimage2 from "./eat2.jpeg";

import './Header.css';

const Header = () => {
    return (
        <div className='Header'>
        <div className='HeaderContainer'>
        <Carousel>
      <Carousel.Item >
      <img  src={hutufafe} alt="Example" width="1000px" height="500px" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img  src={hutufafe} alt="Example" width="1000px" height="500px" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img  src={hutufafe} alt="Example" width="1000px" height="500px" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>


        </div>

        <div className='Submemu_headerpicture'>
          <img  src={eatimage1} alt="Example"  />
          <img  src={eatimage2} alt="Example"  />
        </div>
           
        </div>
    );
};

export default Header;