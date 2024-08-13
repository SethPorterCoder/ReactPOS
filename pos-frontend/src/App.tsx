import './App.css'
import { useState} from 'react';
import LogIn from './LogIn';
import POS from './POS';
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
      <div className="App">
      <POS/> {/* This is how you call components!*/}
    </div>
    );
  }
}




export default App