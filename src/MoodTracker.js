import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, Trash2, ChevronLeft, ChevronRight, BarChart, Smile } from 'lucide-react';

const moodOptions = [
  { emoji: '😄', color: 'bg-yellow-300', label: '开心' },
  { emoji: '😊', color: 'bg-green-300', label: '满足' },
  { emoji: '😐', color: 'bg-gray-300', label: '一般' },
  { emoji: '😢', color: 'bg-blue-300', label: '难过' },
  { emoji: '😡', color: 'bg-red-300', label: '生气' },
];

const MoodTracker = () => {
  const [moodData, setMoodData] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [stats, setStats] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);

  const saveMoodData = useCallback((data) => {
    localStorage.setItem('moodData', JSON.stringify(data));
  }, []);

  useEffect(() => {
    const savedMoodData = localStorage.getItem('moodData');
    if (savedMoodData) {
      setMoodData(JSON.parse(savedMoodData));
    }
  }, []);

  useEffect(() => {
    saveMoodData(moodData);
    calculateStats();
  }, [moodData, currentMonth, saveMoodData]);

  const handleMoodSelect = (day, mood) => {
    const dateKey = `${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1}-${day}`;
    setMoodData(prevData => {
      const newData = { ...prevData };
      if (newData[dateKey] === mood) {
        delete newData[dateKey];
      } else {
        newData[dateKey] = mood;
      }
      return newData;
    });
    setSelectedDay(null); // 选择后关闭对话框
  };

  const calculateStats = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1;
    const monthData = Object.entries(moodData).filter(([key]) => key.startsWith(`${year}-${month}`));
    const totalEntries = monthData.length;
    const moodCounts = moodOptions.reduce((acc, mood) => {
      acc[mood.label] = monthData.filter(([, value]) => value.label === mood.label).length;
      return acc;
    }, {});
    setStats({ totalEntries, moodCounts });
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${month + 1}-${day}`;
      const mood = moodData[dateKey];

      days.push(
        <div
          key={day}
          className="h-12 border border-gray-200 rounded-lg flex flex-col items-center justify-center relative"
          onClick={() => setSelectedDay(day)}
        >
          <span className="text-sm text-gray-500">{day}</span>
          {mood && (
            <span className={`text-xl ${mood.color} rounded-full mt-1`}>
              {mood.emoji}
            </span>
          )}
        </div>
      );
    }

    return days;
  };

  const changeMonth = (increment) => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() + increment);
      return newMonth;
    });
  };

  const clearMoodData = () => {
    if (window.confirm('确定要清除所有心情数据吗？此操作不可撤销。')) {
      setMoodData({});
      localStorage.removeItem('moodData');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <Calendar className="mr-2" /> 心情追踪器
        </h2>
        <button onClick={clearMoodData} className="p-2 hover:bg-gray-100 rounded-full" title="清除数据">
          <Trash2 size={20} />
        </button>
      </div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <span className="font-semibold">
          {currentMonth.getFullYear()}年{currentMonth.getMonth() + 1}月
        </span>
        <button onClick={() => changeMonth(1)} className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-4">
        {['日', '一', '二', '三', '四', '五', '六'].map(day => (
          <div key={day} className="text-center font-bold text-gray-500">{day}</div>
        ))}
        {renderCalendar()}
      </div>
      {selectedDay && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">选择心情 - {selectedDay}日</h3>
            <div className="grid grid-cols-5 gap-2">
              {moodOptions.map(option => (
                <button
                  key={option.label}
                  className={`w-12 h-12 ${option.color} rounded-full flex items-center justify-center`}
                  onClick={() => handleMoodSelect(selectedDay, option)}
                >
                  {option.emoji}
                </button>
              ))}
            </div>
            <button className="mt-4 text-sm text-gray-500 underline" onClick={() => setSelectedDay(null)}>取消</button>
          </div>
        </div>
      )}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <BarChart className="mr-2" size={20} /> 本月心情统计
        </h3>
        <div className="grid grid-cols-5 gap-2">
          {moodOptions.map(mood => (
            <div key={mood.label} className="text-center">
              <div className={`${mood.color} rounded-full p-2 mx-auto w-10 h-10 flex items-center justify-center`}>
                {mood.emoji}
              </div>
              <p className="mt-1 text-sm">{stats.moodCounts?.[mood.label] || 0}</p>
            </div>
          ))}
        </div>
        <p className="text-center mt-2 text-sm text-gray-600">
          总记录: {stats.totalEntries || 0} 天
        </p>
      </div>
    </div>
  );
};

export default MoodTracker;