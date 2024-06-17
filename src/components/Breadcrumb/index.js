import React from 'react';
import './index.css';

const Breadcrumb = ({ path, onNavigate }) => {
  const pathSegments = path.split('/').filter(Boolean);

  const handleNavigate = (index) => {
    const newPath = '/' + pathSegments.slice(0, index + 1).join('/');
    onNavigate(newPath);
  };

  return (
    <div className="breadcrumb">
      <span onClick={() => onNavigate('/')}>root</span>
      {pathSegments.map((segment, index) => (
        <span key={index} onClick={() => handleNavigate(index)}>
          / {segment}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
