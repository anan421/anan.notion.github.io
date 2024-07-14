// src/ProgressBarComponent.js
import React from 'react';

// 进度条组件
const ProgressBarComponent = ({ progress }) => (
  <div className="progress-bar-component w-full bg-gray-200 border border-gray-300 m-4 rounded shadow p-4">
    <div className="progress-bar h-6 bg-green-500 text-white text-center rounded" style={{ width: `${progress}%` }}>
      {progress}%
    </div>
  </div>
);

export default ProgressBarComponent;
