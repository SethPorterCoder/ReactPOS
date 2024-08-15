import React, { useEffect, useState, useRef } from 'react';

interface propsInterface {
    itemCount: number;
    //So in this arrow method, it takes a boolean value and returns nothing.
    //Props are communication between objects.  
    //In this prop, we passed a method from the App.tsx prop to this component
}

function ScrollableButtonGrid({ itemCount }: propsInterface): React.JSX.Element {
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

    useEffect(() => {
        updateGridDimensions();
        window.addEventListener('resize', updateGridDimensions);
        return () => window.removeEventListener('resize', updateGridDimensions);
    }, [itemCount]);

    return (
        <div
            id="gridContainer"
            ref={gridContainerRef} // Attach the ref to the grid container div
            style={{ width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden' }}
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
                    //The ... means to spread the  array.
                    //So for example, javascript
                    //const arr = [1, 2, 3];
                    //const newArr = [...arr, 4, 5]; // [1, 2, 3, 4, 5]
                    [...Array(itemCount)].map((_, index) => (
                        <button key={index} style={{ padding: '75px', width: '100%' }}>
                            Button {index + 1}
                        </button>
                    ))
                }

            </div>
        </div>
    );
}

export default ScrollableButtonGrid;
