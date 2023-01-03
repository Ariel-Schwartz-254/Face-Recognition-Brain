import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className="Tilt ma4 mt0 pa3 w-10">
            <Tilt>
                <div className="br2 shadow-2" style={{border: '16px'}}>
                    <img src={brain} style= {{paddingTop: '5px'}} alt="logo"/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;