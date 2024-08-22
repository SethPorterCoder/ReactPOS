import React, { useEffect, useState, useRef } from 'react';


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

function ScrollableButtonGrid({ itemCount, itemArray, receiptCount, receiptArray, changeReceiptCount }: propsInterface): React.JSX.Element {
    const [gridDimensions, setGridDimensions] = useState({ columns: 1, rows: 1 });

    //Ref for the grid container
    const gridContainerRef = useRef<HTMLDivElement>(null);

    const updateGridDimensions = () => {
        const parentDiv = gridContainerRef.current;
        if (parentDiv) {
            const buttonSize = 200; // Set the desired button size
            const gapSize = 10; // Set the gap between buttons
            const containerWidth = parentDiv.offsetWidth;

            // Calculate the number of columns that can fit without overflowing
            const columns = Math.floor((containerWidth + gapSize) / (buttonSize + gapSize));
            const rows = Math.ceil(itemCount / columns); // Calculate the number of rows based on the total number of buttons

            setGridDimensions({ columns, rows });
        }
    };

    const addChoice = (item: item) => {
        console.log("Scrollable: " + item.name);
        receiptArray.push(item);
        changeReceiptCount(receiptArray.length);
    }

    useEffect(() => {
        updateGridDimensions();
        window.addEventListener('resize', updateGridDimensions);
        return () => window.removeEventListener('resize', updateGridDimensions);
    }, [itemCount]);

    return (

        
        <div
            id="gridContainer"
            ref={gridContainerRef} // Attach the ref to the grid container div
            style={{ 
                width: '100%', 
                height: '100%', 
                overflowY: 'auto',
                marginRight: '10px',
                marginLeft: '10px', 
                overflowX: 'hidden' 
            }}
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${gridDimensions.columns}, 1fr)`,
                    gridAutoRows: 'minmax(100px, auto)',
                    gap: '10px',
                    width: '100%',
                    boxSizing: 'border-box', // Ensure padding and border are included in the element's total width and height
                }}
            >
                {
                    itemArray.map((_, index) => (
                        <button key={index}
                        onClick={() => addChoice(itemArray[index])} 
                        style={
                            { padding: '50px', 
                            width: '100%',
                            backgroundColor: '#555555' }}>
                            {itemArray[index].name}
                        </button>
                    ))
                }

            </div>
        </div>
    );
}

export default ScrollableButtonGrid;
