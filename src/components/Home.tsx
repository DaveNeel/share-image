import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import './Home.css'
export const Home = () => {
    const navigate = useNavigate();

    const handleNavigation = (url) => {
        navigate(url);
    };

    return (
        <div className="container">
            <h1>Share Image Options</h1>
            <div className="options">
                <div className="option" onClick={() => handleNavigation('share-single-image')}>
                    Approach 1: Share Image Link
                </div>
                <div className="option" onClick={() => handleNavigation('share-multiple-image')}>
                    Approach 2: Share Image File
                </div>
            </div>
        </div>
    );
};