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

    itemPanelState: number //1 - Items, 2 - Void Items, 3 - Total Out

    changeReceiptCount: (receiptCount: number) => void;
    //So in this arrow method, it takes a boolean value and returns nothing.
    //Props are communication between objects.  
    //In this prop, we passed a method from the App.tsx prop to this component
}

function ItemPanel({ itemCount, itemArray, receiptCount, receiptArray, changeReceiptCount, itemPanelState }: propsInterface) {


    switch (itemPanelState) {
        case (1):
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

        case (2):
            return (

                <>
                    <p>Void Item Menu</p>
                </>
            );
    }


}






export default ItemPanel;