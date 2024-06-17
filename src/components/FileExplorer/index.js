import React, { useState, useEffect } from 'react';
import Breadcrumb from '../Breadcrumb';
import './index.css';

const dummyFiles = [
  {
    path: '/📁 documents',
    name: '📁 documents',
    size: '810 KB',
    dateModified: '2024-03-01',
    isDirectory: true,
    selected: false,
    children: [
      { path: '/documents/📄 file12.txt', name: '📄 file12.txt', size: '300 KB', dateModified: '2024-01-02', isDirectory: false, selected: false },
      { path: '/documents/📄 file92.txt', name: '📄 file92.txt', size: '510 KB', dateModified: '2024-01-03', isDirectory: false, selected: false },
    ],
  },
  {
    path: '/📁 appdata',
    name: '📁 appdata',
    size: '20 MB',
    dateModified: '2023-12-20',
    isDirectory: true,
    selected: false,
    children: [
      { path: '/appdata/▶️ obb.mp4', name: '▶️ obb.mp4', size: '9 MB', dateModified: '2024-02-18', isDirectory: false, selected: false },
      { path: '/appdata/▶️ obb01.mp4', name: '▶️ obb01.mp4', size: '11 MB', dateModified: '2024-02-18', isDirectory: false, selected: false },
    ],
  },
  
  {
    path: '/📁 folder2',
    name: '📁 folder2',
    size: '324 KB',
    dateModified: '2022-09-03',
    isDirectory: true,
    selected: false,
    children: [
      { path: '/folder2/📄 file01.txt', name: '📄 file01.txt', size: '154 KB', dateModified: '2024-02-02', isDirectory: false, selected: false },
      { path: '/folder2/📄 file02.txt', name: '📄 file02.txt', size: '50 KB', dateModified: '2024-03-02', isDirectory: false, selected: false },
      { path: '/folder2/📄 file03.txt', name: '📄 file03.txt', size: '120 KB', dateModified: '2024-04-02', isDirectory: false, selected: false },
    ],
  },

  { path: '/📄 file46.txt', name: '📄 file46.txt', size: '12 B', dateModified: '2024-03-01', isDirectory: false, selected: false },
];

const FileExplorer = ({ onSelectionChange, onDelete }) => {
  const [files, setFiles] = useState(dummyFiles);
  const [currentPath, setCurrentPath] = useState('/');

  const getCurrentFiles = () => {
    let currentFiles = files;
    if (currentPath !== '/') {
      const pathSegments = currentPath.split('/').filter(Boolean);
      pathSegments.forEach(segment => {
        const folder = currentFiles.find(file => file.name.startsWith(segment) && file.isDirectory);
        if (folder) {
          currentFiles = folder.children;
        }
      });
    }
    return currentFiles;
  };

  const handleCheckboxChange = (filePath) => {
    const updatedFiles = [...files];
    const updateSelection = (items) => {
      items.forEach(item => {
        if (item.path === filePath) {
          item.selected = !item.selected;
        }
        if (item.isDirectory && item.children) {
          updateSelection(item.children);
        }
      });
    };
    updateSelection(updatedFiles);
    setFiles(updatedFiles);
    onSelectionChange(getSelectedFiles(updatedFiles));
  };

  const handleFolderClick = (folderPath) => {
    setCurrentPath(folderPath);
  };

  const getSelectedFiles = (items) => {
    let selectedFiles = [];
    const traverse = (files) => {
      files.forEach(file => {
        if (file.selected) {
          selectedFiles.push(file);
        }
        if (file.isDirectory && file.children) {
          traverse(file.children);
        }
      });
    };
    traverse(items);
    return selectedFiles;
  };

  const deleteFile = (filePath) => {
    const deleteFromFiles = (items) => {
      return items.filter(item => {
        if (item.path === filePath) {
          return false;
        }
        if (item.isDirectory && item.children) {
          item.children = deleteFromFiles(item.children);
        }
        return true;
      });
    };
    const updatedFiles = deleteFromFiles(files);
    setFiles(updatedFiles);
    onSelectionChange(getSelectedFiles(updatedFiles));
  };

  useEffect(() => {
    onSelectionChange(getSelectedFiles(files));
  }, [files]);

  useEffect(() => {
    onDelete(() => deleteFile);
  }, [onDelete]);

  return (
    <div className="file-explorer">
      <Breadcrumb path={currentPath} onNavigate={setCurrentPath} />
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Folder Name</th>
            <th>Size</th>
            <th>Date Modified</th>
          </tr>
        </thead>
        <tbody>
          {getCurrentFiles().map(file => (
            <tr key={file.path}>
              <td>
                <input
                  type="checkbox"
                  checked={file.selected}
                  onChange={() => handleCheckboxChange(file.path)}
                />
              </td>
              <td onClick={() => file.isDirectory && handleFolderClick(file.path)}>{file.name}</td>
              <td>{file.size}</td>
              <td>{file.dateModified}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileExplorer;
