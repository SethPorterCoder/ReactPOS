import { useState } from "react";

interface propsInterface {
    handleItemPanel: (state: number) => void;
    buttonState: number; //1 - Void, 2 - Pay, 3 - Items
}

function DynamicButton({handleItemPanel, buttonState}: propsInterface){

    


    switch(buttonState) {
        case(1): //Void
            return(
                <>
                  <button id='voidButton'type="button" onClick={() => handleItemPanel(2)}>Void</button>
                </>
            );
        
    }
   


}
export default DynamicButton;