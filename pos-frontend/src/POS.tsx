
import './POS.css';
import { useEffect, useState } from 'react';
import ScrollableButtonGrid from './ScrollableButtonGrid';
import axios from 'axios';

interface propsInterface {
  handleLogInStatus: (status: boolean) => void;
  devAddress: string;
  //So in this arrow method, it takes a boolean value and returns nothing.
  //Props are communication between objects.  
  //In this prop, we passed a method from the App.tsx prop to this component

}



  

function POS({ handleLogInStatus, devAddress }: propsInterface) {
  const [itemCount, setItemCount] = useState(0);
  const [itemArray, setItemArray] = useState(undefined);


  const logOutButtonPressed = () => {
    handleLogInStatus(false);
  }

  const refreshItems = async () => {
    try {
      const response = await axios.get(devAddress + "/api/getItems")
      .then(response => {
        setItemCount(response.data.length);
        setItemArray(response.data);
      });

      console.log(itemArray);
    } catch (error) {
      console.error("Error Message:" + error);
    }
  };
  useEffect(() => {
    refreshItems();
  }, []); // Dependency array is now empty, so this will only run once after the initial render.
  



// Function to handle changing the number of divs

  
  return (
    <div>


      <div id="basePOS">
        <div id="mainPOS">
          <div id="receiptBox">
            <div id="receiptDisplay">

            </div>


            <div id="actionBox">


            </div>



          </div>

          <div id="itemBox">
            <ScrollableButtonGrid itemCount={itemCount}></ScrollableButtonGrid>

          </div>
        </div>



      </div>

      <div id="topBar">
        <div id="userBox">
          <img id="loggedInUser" src="/assets/loggedIn256.png" width="40" height="40"></img>
          <div id="userName">User</div>
        </div>

        <div id="logOutBox">
          <form>
            <button id="logOut" type="button" onClick={logOutButtonPressed}>Log out</button>
          </form>
        </div>


      </div>
    </div>




  );
}


export default POS;