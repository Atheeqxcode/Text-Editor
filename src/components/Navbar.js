import React from 'react';
import PropTypes from 'prop-types';

export default function Navbar(props) {
  return (
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
      <div className={`navbar-brand text-${props.mode === 'light' ? 'dark' : 'light'} mx-3`}>
        {props.title}
      </div>
      <button
        style={{ textDecoration: 'none', fontStyle: 'italic', fontWeight: 'bold', fontSize: '1.2rem' }}
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item active my-3 mx-3">
            <a className={`nav-link text-${props.mode === 'light' ? 'dark' : 'light'}`} href="/">
              <b>HOME</b> <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/about">
              {props.aboutText}
            </a>
          </li>
        </ul>
        <div className={`form-check form-switch ms-auto d-flex text-${props.mode === 'light' ? 'dark' : 'light'}`}>
          <input
            className="form-check-input"
            onClick={props.toggleMode}
            type="checkbox"
            id="flexSwitchCheckDefault"
          />
          <label
            className={`form-check-label text-${props.mode === 'light' ? 'dark' : 'light'}`}
            htmlFor="flexSwitchCheckDefault"
            style={{ textDecoration: 'none', fontStyle: 'italic', fontWeight: 'bold', fontSize: '1.2rem' }}
          >
            Dark Mode
          </label>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string,
  aboutText: PropTypes.string,
  mode: PropTypes.string.isRequired,
  toggleMode: PropTypes.func.isRequired,
};
