import React, { useState } from 'react';
import FileExplorer from './components/FileExplorer';
import SelectedItems from './components/SelectedItems';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [deleteFile, setDeleteFile] = useState(() => () => {});

  const handleSelectionChange = (newSelection) => {
    setSelectedItems(newSelection);
  };

  const handleDelete = (filePath) => {
    // Logic to delete the file and update the state accordingly
    // Assuming we have a function `deleteFileFromState` which removes the file from the state
    deleteFile(filePath);
    setSelectedItems((prevItems) => prevItems.filter(item => item.path !== filePath));
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <div className="division division-1">
          <FileExplorer onSelectionChange={handleSelectionChange} onDelete={setDeleteFile} />
        </div>
        <div className="division division-2">
          <SelectedItems selectedItems={selectedItems} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default App;
