import './App.css'
import { useState } from 'react';
import LogIn from './LogIn';
import POS from './POS';
//You need axios to make HTTP requests!


//This is the dev IP address.
//CHange this when in production
var devAddress: string = "http://localhost:3001"  




function App() {
  const[logInStatus, setLogInStatus] = useState<boolean>(false);


  if(!logInStatus) {
    return (
      <div className="App">
        <LogIn 
      handleLogInStatus={setLogInStatus} 
      devAddress={devAddress}
        /> {/* This is how you call components!*/}
      </div>
    );
  }
  else if(logInStatus) {
    return (
      <div className="App">
      <POS
      handleLogInStatus={setLogInStatus}
      devAddress={devAddress}/> {/* This is how you call components!*/}
    </div>
    );
  }
}




export default App