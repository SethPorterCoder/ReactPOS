import './App.css'
import React, { useState, useEffect, useRef, ObjectHTMLAttributes, KeyboardEventHandler } from 'react';
import axios from 'axios';
import LogIn from './LogIn';
//You need axios to make HTTP requests!



function App() {
  const[logInStatus, setLogInStatus] = useState<boolean>(false);
  console.log(logInStatus);


  if(!logInStatus) {
    return (
      <div className="App">
        <LogIn 
      handleLogInStatus={setLogInStatus} 
        /> {/* This is how you call components!*/}
      </div>
    );
  }
  else if(logInStatus) {
    return (
      <div>
        <h1>Signed in successfully!</h1>
        


      </div>



    );
  }
}




export default App