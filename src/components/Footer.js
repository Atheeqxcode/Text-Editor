
import React from 'react';
import githubLogo from './images/github9775.jpg';
import instaLogo from './images/insta.png';
import linkedinLogo from './images/linked-in.png';
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="social-links">
        <a href="https://github.com/Atheeqxcode" target="_blank" rel="noopener noreferrer">
          <img src={githubLogo} alt="GitHub" />
        </a>
        <a href="https://www.linkedin.com/in/atheeq-zee8/" target="_blank" rel="noopener noreferrer">
          <img src={linkedinLogo} alt="LinkedIn" />
        </a>
        <a href="https://www.instagram.com/_disaster_017/" target="_blank" rel="noopener noreferrer">
          <img src={instaLogo} alt="Instagram" />
        </a>
      </div>
      <p className="text-center">
        Let's Connect and build Together !
      </p>
      <p>2024 - copyright All Rights Reserved</p>
    </div>

  );
};

export default Footer;
