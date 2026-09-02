import React from 'react'
import { useDispatch } from "react-redux";
import {toggleTheme} from "../../../../shared/state/Theme.slice.jsx";

const Home = () => {
    const dispatch = useDispatch();

  const handleChangeTheme = () => {
    dispatch(toggleTheme());
  };
  return (
    <div>
    
   <h1>I m Home.jsx inside dashboard</h1>
    <h3 onClick={handleChangeTheme}>Change Theme</h3>  
    </div>
  )
}

export default Home
