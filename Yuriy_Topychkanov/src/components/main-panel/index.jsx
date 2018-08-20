import React from 'react';
import Header from '../header/index.jsx';
import Footer from '../footer/index.jsx';
import './style.css';
import BodyController from "../../controllers/BodyController.jsx";

export default function MainPanel() {
    return <div className='main-panel'>
        <Header/>
        <BodyController/>
        <Footer/>
    </div>
}