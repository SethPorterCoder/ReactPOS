import React, { useState, useEffect, useRef, ObjectHTMLAttributes, KeyboardEventHandler } from 'react';
import axios from 'axios';

//Since this is typescript, we need to define what datatypes props are going to be using.
//We use an interface that defines method exactly.
interface propsInterface {
  handleLogInStatus: (status: boolean) => void;
  //So in this arrow method, it takes a boolean value and returns nothing.
  //Props are communication between objects.  
  //In this prop, we passed a method from the App.tsx prop to this component

}

function LogIn({handleLogInStatus} : propsInterface ){
    //This is how to make reactive button with states
    //States allow for the visible components on the website to change.
    //There are two states.  One that user sees called is the actual DOM.
    //The other is called the virtual DOM.  Changes made to the virtual DOM update the actual DOM.
    //This is super fast compared to editing the acutal DOM.  ReactJS is all about changing the virutal DOM over the actual DOM.
    const [test, changeLabel] = useState("Nothing has been pressed yet");
    const [textData, setTextData] = useState("No request has been made");
  
    const [userIDValue, setUserIDValue] = useState("");
    const [pinValue, setPinValue] = useState("");
  
    //Hooks allow you to create refences to tags.  In this case, it's for input tag to change focus
    const pinRef = useRef<HTMLInputElement>(null);
  
  
    
    //The axios.get code attemps a connection with the https server.  
    //If a successful request connection is formed, the .then code is ran and the data will be returned to the response variable.
    //the .data is the variable that is stored in the response.
    //For post methods, aysnc must be declared as you need to wait for the axios post promise to be fulifulled.
    const sendAPI = async () => {
      try {
        //With post, you need to await the completion of the promise as Javascript code runs all at once!
        //Meaning you need to declare when to wait when this promise is completed or it not work correctly.
        const response = await axios.post('http://localhost:3001/api/message', "Hello world");
        console.log('Server response:', response.data);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  
    const submitLogIn = async (ID: string, PIN: string) => {
      try {
        let userCred = {"ID":parseInt(ID), "PIN":parseInt(PIN)}
          
    
        const response = await axios.post("http://localhost:3001/api/login", userCred);
        console.log(response.data);

        if(response.data.length == 0){
          console.log("Log in failed")
        }
        else if(response.data[0]["userID"] != null) {
          handleLogInStatus(true);
        } 



      } catch(error){
        console.error("Error Message:" + error);
      }
    }
  
  
  
  
  
  
    //When the user ID input changes in anyway at all, it calls this function via the onChange tag in the input form
    const userIDValueEvent = (event: {target: {value: string}}) => {
      setUserIDValue(event.target.value);
    } 
  
    const pinValueEvent = (event: {target: {value: string}}) => {
      setPinValue(event.target.value);
    }
  
  
    //This is called when the user presses down on any key via the keyDown tag.
    //Since the method activates with a keyboard event, we have to cast event to it with the HTMLInputElement Generic
    const handleKeyDownForm = async (event: React.KeyboardEvent<HTMLInputElement>) => {
  
      //Cast the event as an HTMLInput Element
      //This is because it allows the specific Input attribute to be accessed
      const inputElement = event.target as HTMLInputElement;
  
      switch(inputElement.placeholder) {
        case("ID"): 
          switch(event.key) {
            case("Enter"):
              event.preventDefault(); //This prevents the webpage from doing it's default action.  IN this case, it's refreshing the page.
              pinRef.current?.focus(); //This changes the active form to the pin code form.
              //The ? in TypeScript allows for the compiler to ONLY run this code if it is not null.
              return;
          }
  
        case("PIN"):
          switch(event.key) {
            case("Enter"):
            event.preventDefault(); //This prevents the webpage from doing it's default action.  IN this case, it's refreshing the page.
            buttonPressed();
            return;
          }
      }
    }
  
    const buttonPressed = async () => {
      changeLabel("Button was pressed")
      //sendAPI();
      submitLogIn(userIDValue, pinValue);
  
    }
  
    //Hash method for password to sende to the backend.  It uses SHA-256 encoding
    const hashString = async () => {
      const encoder = new TextEncoder();
      const data = encoder.encode("password");
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      //console.log(hashHex);
  
    }
    hashString();
  
  
  
  
  
  
  
    return (
      <div className="log">
        <h1>Sign in</h1>
  
        <form>
        {/* The value tag is how you set text in code. */}
          <input 
            type="text" 
            placeholder="ID" 
            value={userIDValue} 
            onChange={userIDValueEvent}
            onKeyDown={handleKeyDownForm}>
          </input> 
        </form>
  
        <form>
          {/* The value tag is how you set text in code. */}
          <input 
            type="text" 
            placeholder="PIN" 
            value={pinValue} 
            onChange={pinValueEvent}
            onKeyDown={handleKeyDownForm}
            ref={pinRef}>
          </input>
        </form>
  
        <form>
          <button type="button" onClick={buttonPressed}>Enter</button>
        </form>
  
        {/* Line break */}
        <br>
        </br>
  
        <label>{test}</label>
  
        {/* Line break */}
        <br> 
        </br>
  
        <label>{textData}</label>
  
      </div>
    )
  
  
  }

  export default LogIn