/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef, useEffect } from 'react'
import { FaBars, FaTwitter } from 'react-icons/fa'
import { links, social } from './data'
import logo from './logo.svg'

const Navbar = () => {
  const toggle = () => {
    setShowLinks(!showLinks)
  }
  const [showLinks, setShowLinks] = useState(false)
  return (
    <nav>
      <div className='nav-center'>
        <div className='nav-header'>
          <img src={logo} alt='logo'></img>
          <button className='nav-toggle' onClick={toggle}>
            <FaBars />
          </button>
        </div>
        
          <div
            className={` ${
              showLinks ? 'links-container show-container' : 'links-container'
            } `}
          >
            <ul className='links'>
              {links.map((link) => {
                const { id, url, text } = link
                return (
                  <li key={id}>
                    <a href={url}>{text}</a>
                  </li>
                )
              })}
            </ul>
          </div>
        

        <ul className='social-icons'>
          {social.map((socialIcon) => {
            const { id, url, icon } = socialIcon
            return (
              <li key={id}>
                <a href={url}>{icon}</a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
