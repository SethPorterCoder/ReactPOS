
import './POS.css';
import { useEffect, useState } from 'react';
import ItemPanel from './ItemPanel';
import axios from 'axios';
import ReceiptTable from './ReceiptTable';

interface propsInterface {
  handleLogInStatus: (status: boolean) => void;
  devAddress: string;
  //So in this arrow method, it takes a boolean value and returns nothing.
  //Props are communication between objects.  
  //In this prop, we passed a method from the App.tsx prop to this component

}

type item = {
  itemID: number;
  name: string;
  price: number;
}

var _taxRate: number = 0.10; //Ten percent.  Change this number on deployment.

function POS({ handleLogInStatus, devAddress }: propsInterface) {
  const [itemCount, setItemCount] = useState(0);
  const [itemArray, setItemArray] = useState<item[]>([]);

 
  const [receiptArray] = useState<item[]>([]);
  const [receiptCount, setReceiptCount] = useState(0);

  const [tax, setTax] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);  


  const logOutButtonPressed = () => {
    handleLogInStatus(false);
  }

  const refreshItems = async () => {
    try {
      await axios.get(devAddress + "/api/getItems")
      .then(response => {
        setItemCount(response.data.length);
        setItemArray(response.data);
      });

    } catch (error) {
      console.error("Error Message:" + error);
    }
  };

  useEffect(() => {
    refreshItems();
  }, [])

  useEffect(() => {
    let tempTotal: number = 0;
    let tempTax: number = 0;

    for(let i: number = 0; i < receiptCount; i++) {
      
      tempTotal = tempTotal + Number(receiptArray[i].price);
    
    
    }



    tempTax = tempTotal * _taxRate;
    setTotal(tempTotal + tempTax);
    setTax(tempTax);


  }, [receiptCount]);

  

  



// Function to handle changing the number of divs

  
  return (
    <div>


      <div id="basePOS">
        <div id="mainPOS">
          <div id="receiptBox">
            <div id="receiptDisplay">
              <ReceiptTable receiptCount={receiptCount} receiptArray={receiptArray}></ReceiptTable>
            </div>


            <div id="actionBox">
              <div id="taxBox">
                <div id='taxLabelDiv'>
                  <label id='taxLabel'>Tax:</label>
                </div>
                <div id='taxAmountDiv'>
                  <label id='taxAmountLabel'>${tax.toFixed(2)}</label>
                </div>
              </div>
              <div id="totalBox">
                <div id='totalLabelDiv'>
                  <label id='totalLabel'>Total:</label>
                </div>
                <div id='totalAmountDiv'>
                  <label id='totalAmountLabel'>${total.toFixed(2)}</label>
                </div>
              </div>
              <div id='voidPayBox'>
                <div id='voidButtonBox'>
                  <button id='voidButton'>Void</button>
                </div>
                <div id='payButtonBox'>
                  <button id='payButton'>Pay</button>
                </div>
              </div>


            </div>



          </div>

          <div id="itemBox">
            <ItemPanel 
              itemCount={itemCount} 
              itemArray={itemArray}
              receiptCount={receiptCount}
              receiptArray={receiptArray}

              changeReceiptCount={setReceiptCount}
              >

              </ItemPanel>

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