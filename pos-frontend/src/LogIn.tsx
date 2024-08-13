import React, { useState, useRef } from 'react';
import axios from 'axios';
import './LogIn.css';


//Since this is typescript, we need to define what datatypes props are going to be using.
//We use an interface that defines method exactly.
interface propsInterface {
  handleLogInStatus: (status: boolean) => void;
  devAddress: string;
  //So in this arrow method, it takes a boolean value and returns nothing.
  //Props are communication between objects.  
  //In this prop, we passed a method from the App.tsx prop to this component

}

function LogIn({ handleLogInStatus, devAddress }: propsInterface) {
  //This is how to make reactive button with states
  //States allow for the visible components on the website to change.
  //There are two states.  One that user sees called is the actual DOM.
  //The other is called the virtual DOM.  Changes made to the virtual DOM update the actual DOM.
  //This is super fast compared to editing the acutal DOM.  ReactJS is all about changing the virutal DOM over the actual DOM.

  const [userIDValue, setUserIDValue] = useState("");
  const [pinValue, setPinValue] = useState("");
  //Hooks allow you to create refences to tags.  In this case, it's for input tag to change focus
  const pinRef = useRef<HTMLInputElement>(null);



  //The axios.get code attemps a connection with the https server.  
  //If a successful request connection is formed, the .then code is ran and the data will be returned to the response variable.
  //the .data is the variable that is stored in the response.
  //For post methods, aysnc must be declared as you need to wait for the axios post promise to be fulifulled.
  const submitLogIn = async (ID: string, PIN: string) => {
    try {
      let userCred = { "ID": parseInt(ID), "PIN": parseInt(PIN) }


      const response = await axios.post(devAddress + "/api/login", userCred);
      console.log(response.data);

      if (response.data.length == 0) {
        console.log("Log in failed")
      }
      else if (response.data[0]["userID"] != null) {
        handleLogInStatus(true);
      }



    } catch (error) {
      console.error("Error Message:" + error);
    }
  }






  //When the user ID input changes in anyway at all, it calls this function via the onChange tag in the input form
  const userIDValueEvent = (event: { target: { value: string } }) => {
    setUserIDValue(event.target.value);
  }

  const pinValueEvent = (event: { target: { value: string } }) => {
    setPinValue(event.target.value);
  }


  //This is called when the user presses down on any key via the keyDown tag.
  //Since the method activates with a keyboard event, we have to cast event to it with the HTMLInputElement Generic
  const handleKeyDownForm = async (event: React.KeyboardEvent<HTMLInputElement>) => {

    //Cast the event as an HTMLInput Element
    //This is because it allows the specific Input attribute to be accessed
    const inputElement = event.target as HTMLInputElement;

    switch (inputElement.placeholder) {
      case ("ID"):
        switch (event.key) {
          case ("Enter"):
            event.preventDefault(); //This prevents the webpage from doing it's default action.  IN this case, it's refreshing the page.
            pinRef.current?.focus(); //This changes the active form to the pin code form.
            //The ? in TypeScript allows for the compiler to ONLY run this code if it is not null.
            return;
        }
        return;
        

      case ("PIN"):
        switch (event.key) {
          case ("Enter"):
            event.preventDefault(); //This prevents the webpage from doing it's default action.  IN this case, it's refreshing the page.
            buttonPressed();
            return;
        }
        return;

    }
  }

  const buttonPressed = async () => {
    //sendAPI();
    submitLogIn(userIDValue, pinValue);

  }









  return (
    <div id="base">
      <div id="logInSection">
       
        <img id="userIcon" src="/assets/user256.png" width="128" height="128"></img>

        <div id="forms">

          <form>
            {/* The value tag is how you set text in code. */}
            <input
              id="ID"
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
              id="PIN"
              type="text"
              placeholder="PIN"
              value={pinValue}
              onChange={pinValueEvent}
              onKeyDown={handleKeyDownForm}
              ref={pinRef}>
            </input>
          </form>

          <form>
            <button id="logButtons"type="button" onClick={buttonPressed}>Log in</button>
          </form>

          <form>
            <button id="logButtons" type="button" onClick={buttonPressed}>Register</button>
          </form>
        </div>
      </div>
    </div>
  )


}

export default LogIn