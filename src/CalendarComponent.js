// src/CalendarComponent.js
//import React from 'react';

import React, { useState } from 'react';
// 日历组件
const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const renderCalendar = () => {
    const totalDays = daysInMonth(currentDate);
    const startDay = firstDayOfMonth(currentDate);
    const blanks = Array(startDay).fill(null);
    const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);
    const allDays = [...blanks, ...daysArray];

    return allDays.map((day, index) => {
      const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();
      const isCurrentMonth = day !== null;

      return (
        <div
          key={index}
          className={`p-2 text-center rounded-full transition-all duration-300 
            ${isCurrentMonth ? 'cursor-pointer hover:bg-pink-200 hover:shadow-lg' : 'invisible'} 
            ${isToday ? 'bg-gradient-to-br from-pink-400 to-purple-500 text-white shadow-lg' : ''}
            ${!isToday && isCurrentMonth ? 'text-gray-800 hover:text-pink-600' : ''}
          `}
        >
          {day}
        </div>
      );
    });
  };

  const changeMonth = (increment) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1));
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-pink-100 via-pink-200 to-purple-200 p-1 rounded-3xl shadow-2xl">
      <div className="bg-white bg-opacity-40 backdrop-filter backdrop-blur-lg rounded-2xl overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => changeMonth(-1)}
              className="text-pink-600 hover:text-pink-800 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={() => changeMonth(1)}
              className="text-pink-600 hover:text-pink-800 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {days.map(day => (
              <div key={day} className="text-center font-medium text-pink-600 text-sm">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {renderCalendar()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
