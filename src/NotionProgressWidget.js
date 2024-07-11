import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Sun, Moon } from 'lucide-react';

const ProgressBar = ({ value, max, label, icon: Icon }) => (
  <div className="mb-6">
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center">
        <Icon className="w-5 h-5 mr-2 text-pink-400" />
        <span className="text-sm font-medium text-gray-600">{label}</span>
      </div>
      <span className="text-sm font-medium text-gray-600">{`${value}/${max}`}</span>
    </div>
    <div className="w-full bg-pink-100 rounded-full h-3">
      <div 
        className="bg-gradient-to-r from-pink-300 to-purple-300 h-3 rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${(value / max) * 100}%` }}
      ></div>
    </div>
  </div>
);

const NotionProgressWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const getDayOfYear = (date) => {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  const getWeekOfYear = (date) => {
    const start = new Date(date.getFullYear(), 0, 1);
    const diff = date - start;
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.ceil(diff / oneWeek);
  };

  const isLeapYear = (year) => {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
  };

  const year = time.getFullYear();
  const dayOfYear = getDayOfYear(time);
  const daysInYear = isLeapYear(year) ? 366 : 365;
  const month = time.getMonth() + 1;
  const daysInMonth = new Date(year, month, 0).getDate();
  const dayOfMonth = time.getDate();
  const weekOfYear = getWeekOfYear(time);
  const dayOfWeek = time.getDay() + 1;

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl shadow-lg overflow-hidden md:max-w-2xl p-8">
      <div className="text-4xl font-bold text-center mb-8 text-pink-500 flex items-center justify-center">
        {time.getHours() < 18 ? <Sun className="w-8 h-8 mr-3 text-yellow-400" /> : <Moon className="w-8 h-8 mr-3 text-indigo-400" />}
        {formatTime(time)}
      </div>
      <ProgressBar value={dayOfYear} max={daysInYear} label="Year Progress" icon={Calendar} />
      <ProgressBar value={dayOfMonth} max={daysInMonth} label="Month Progress" icon={Heart} />
      <ProgressBar value={dayOfWeek} max={7} label="Week Progress" icon={Sun} />
    </div>
  );
};

export default NotionProgressWidget;