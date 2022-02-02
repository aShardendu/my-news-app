import React from "react";
import newslogo from "../Assets/newslogo.png"
//import newslogo1 from "../Assets/newslogo1.jpg"
import   "./Header.css";
// import Searchbar from './Searchbar.js';
export default function Header(){
  return(
    <header >
      <div className="Header">
      <h1><img src={newslogo}/> The News Wave</h1>
      </div>
    </header>
  )
}