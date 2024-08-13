import React from 'react';

interface ItemListProps {
  items: string[]; // Assuming the items are strings, but they could be objects too
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <button key={index} onClick={() => alert(item)}>
          {item}
        </button>
      ))}
    </div>
  );
};

const DynamicButtonTest: React.FC = () => {
  // Example list of items
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Seth', 'Porter'];

  return (
    <div>
      <h1>Dynamic Buttons</h1>
      <ItemList items={items} />
    </div>
  );
};

export default DynamicButtonTest;
