import React, { useState, useEffect } from 'react';
import { Sun } from 'lucide-react';

const SunflowerTimeTracker = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getProgress = (current, total) => (current / total) * 100;

  const yearProgress = getProgress(time.getDate() + time.getMonth() * 30, 365);
  const monthProgress = getProgress(time.getDate(), 30);
  const weekProgress = getProgress(time.getDay(), 7);

  return (
    <div className="p-6 bg-yellow-100 rounded-lg shadow-md max-w-sm mx-auto font-sans">
      <div className="text-4xl font-bold text-center mb-4 text-yellow-600">
        {time.toLocaleTimeString()}
      </div>
      <div className="flex items-center justify-center mb-4">
        <Sun className="text-yellow-500 mr-2" size={24} />
        <span className="text-lg font-semibold text-yellow-700">Sunflower Time Tracker</span>
      </div>
      {['Year', 'Month', 'Week'].map((period, index) => (
        <div key={period} className="mb-3">
          <div className="flex justify-between text-sm text-yellow-700 mb-1">
            <span>{period}</span>
            <span>
              {index === 0 && `${time.getDate() + time.getMonth() * 30}/365`}
              {index === 1 && `${time.getDate()}/30`}
              {index === 2 && `${time.getDay()}/7`}
            </span>
          </div>
          <div className="w-full bg-yellow-200 rounded-full h-4 overflow-hidden">
            <div 
              className="bg-yellow-400 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${index === 0 ? yearProgress : index === 1 ? monthProgress : weekProgress}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SunflowerTimeTracker;
