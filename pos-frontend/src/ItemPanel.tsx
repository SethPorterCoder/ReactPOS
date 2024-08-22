import ScrollableButtonGrid from './ScrollableButtonGrid';

//This create a data type.  It's object but TYPESCRIPT QUEEN
type item = {
    itemID: number;
    name: string;
    price: number;
}
interface propsInterface {
    itemCount: number;
    itemArray: item[];

    receiptCount: number;
    receiptArray: item[];

    changeReceiptCount: (receiptCount: number) => void;
    //So in this arrow method, it takes a boolean value and returns nothing.
    //Props are communication between objects.  
    //In this prop, we passed a method from the App.tsx prop to this component
}

function ItemPanel({ itemCount, itemArray, receiptCount, receiptArray, changeReceiptCount}: propsInterface)  {
    let x = 1;
    if(x == 1) {
        return (
            <>
            <ScrollableButtonGrid 
                itemCount={itemCount} 
                itemArray={itemArray}
                receiptCount={receiptCount}
                receiptArray={receiptArray}
                changeReceiptCount={changeReceiptCount}
                >

                </ScrollableButtonGrid>
            </>

        );
    } else {

    }





}

export default ItemPanel;