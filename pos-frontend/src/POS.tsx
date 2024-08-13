
import './POS.css';
import DynamicButtonTest from './DynamicButtonTest';



function POS() {
  return (
    <div>
      <div id="topBar">
        <div id="userBox">
          <img id="loggedInUser" src="/assets/loggedIn256.png" width="40" height="40"></img>
          <div id="userName">User</div>
        </div>

        <div id="logOutBox">
          <form>
            <button id="logOut" type="button">Log out</button>
          </form>
        </div>


      </div>

      <div id="basePOS">
        <DynamicButtonTest></DynamicButtonTest>
      </div>
    </div>
  );
}


export default POS;