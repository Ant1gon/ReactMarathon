import React from 'react';
import { Link } from "react-router-dom";
//import s from './style.module.css';


const Aboutpage = ({onChangePage}) => {
  return (
    <>
      <h1>About Page</h1>
      <Link to="/"> Back </Link>
    </>
  )
}

export default Aboutpage;