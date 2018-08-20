import React from 'react';
import MainMenu from "../main-menu/index.jsx";
import './style.css';

export default function Header() {
    return <header>
        <MainMenu/>
        <img className='logo' src='/src/images/logo.png' alt='pokemon-logo'/>
    </header>
}