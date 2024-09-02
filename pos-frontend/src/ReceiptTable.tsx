import React from "react";
import { useState, useRef, useEffect } from "react";


type item = {
    itemID: number;
    name: string;
    price: number;
}

interface propsInterface {
    receiptArray: item[];
    receiptCount: number;
}






function ReceiptTable({ receiptCount, receiptArray }: propsInterface) {
    //Ref for the grid container
    const receiptGridRef = useRef<HTMLDivElement>(null);
    const lastItemRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        console.log("Use Effect: " + lastItemRef.current?.id);
        lastItemRef.current?.scrollIntoView();
        
    }, [receiptCount]);

      return (
        <>
            <div
                id="receiptGrid"
                ref={receiptGridRef}
                style={{
                    display: 'grid',
                    gridTemplateColumns: '25% 75%', // Two columns: 25% and 75%
                    overflowY: 'auto',

                    marginRight: 'auto',
                    marginLeft: '10px',
                    marginTop: '10px',

                    overflowX: 'hidden',
                    maxHeight: '95%',
                    gap: '0px', // Ensure there's no gap between grid rows
                }}
            >
                {
                    receiptArray.map((item, index) => (
                        <React.Fragment key={index} >
                            <div style={{ padding: '0px', color: 'black' }}>
                                {item.price}
                            </div>
                            <div ref={lastItemRef} id={""+ item.itemID} style={{ padding: '0px', color: 'black' }}>
                                {item.name}
                            </div>
                        </React.Fragment>
                    ))
                }
            </div>
        </>
        
    ) ;
} 

export default ReceiptTable;
