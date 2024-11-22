"use client";
import React, {useState} from 'react'
import "./header.css"
import Image from 'next/image';
import Nav from './Nav';
import Sci from './Sci';
import SearchForm from './SearchForm';

export default function Header() {
  const [open, setOpen] = useState(false)
  const [on, setOn] = useState(false);
  const handleFormOpen = (e: Event | any) =>{
    e.preventDefault();
    setOpen(!open);
  }
  const handleToggleMenu=()=>{
    setOn(!on);
    let body: HTMLElement | any = document.querySelector("body")
    body.classList.toggle("mobile-nav-active");
  }

  return (
    <header id="header" className='header d-flex align-items-center fixed-top'>
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <a href="/" className="logo d-flex align-items-center">
          <Image src="/assets/img/forpeoplereversed.png" alt="Logo" width={90} height={90} />
        </a>
        <Nav />
        <div className="position-relative">
          <Sci />
          <a className='mx-2 js-search-open' onClick={handleFormOpen}>
            <span className='bi-search'></span>
          </a>
        
        {
          on ? (
            <i className='bi bi-x mobile-nav-toggle' onClick={handleToggleMenu}></i>
          ) : (<i className='bi bi-list mobile-nav-toggle' onClick={handleToggleMenu}></i>)
        }
          <SearchForm active={open} formOpen={handleFormOpen}/>
        </div>
      </div>

    </header>
  )
}
