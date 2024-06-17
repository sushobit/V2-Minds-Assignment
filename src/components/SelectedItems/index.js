import React from 'react';
import './index.css';

const SelectedItems = ({ selectedItems, onDelete }) => {
  const handleDeleteClick = (filePath) => {
    onDelete(filePath);
  };

  return (
    <div className="selected-items">
      <h3>Selected Items</h3>
      <ul>
        {selectedItems.map(item => (
          <li key={item.path}>
            {item.name}
            <button onClick={() => handleDeleteClick(item.path)}>Delete ❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedItems;
