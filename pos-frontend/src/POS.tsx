
import './POS.css';
import DynamicButtonTest from './DynamicButtonTest';

interface propsInterface {
  handleLogInStatus: (status: boolean) => void;
  devAddress: string;
  //So in this arrow method, it takes a boolean value and returns nothing.
  //Props are communication between objects.  
  //In this prop, we passed a method from the App.tsx prop to this component

}





function POS({handleLogInStatus, devAddress}: propsInterface) {
  const logOutButtonPressed = () => {
    handleLogInStatus(false);
  }



  return (
    <div>
     

      <div id="basePOS">
        <div id="mainPOS">
          <DynamicButtonTest></DynamicButtonTest>
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

  console.log(devAddress);
}


export default POS;