// src/App.js
// App.js
// 主要的应用组件，负责渲染 Notion 组件集合页面
// 现在采用少女风格设计，使用中文，并添加了可爱的装饰元素
// copyright@anan421
import React from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NotionProgressWidget from './NotionProgressWidget';
import CalendarComponent from './CalendarComponent';
import ProgressBarComponent from './ProgressBarComponent';
import MoodTracker from './MoodTracker';
import { Heart } from 'lucide-react';
import './index.css';

const CuteDecoration = () => (
  <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
    <div className="absolute top-5 left-5 text-4xl">🌸</div>
    <div className="absolute top-5 right-5 text-4xl">🎀</div>
    <div className="absolute bottom-5 left-5 text-4xl">🦄</div>
    <div className="absolute bottom-5 right-5 text-4xl">🌈</div>
  </div>
);

const ComponentWrapper = ({ component: Component }) => (
  <div className="p-4">
    <Component />
  </div>
);

function App() {
  const components = [
    { id: 'notion-progress-widget', title: '年进度组件', component: NotionProgressWidget, description: "追踪你的年度、月度和周进度" },
    { id: 'calendar', title: '日历组件', component: CalendarComponent, description: "一个简单的日历，用于跟踪事件和截止日期" },
    { id: 'progress-bar', title: '进度条', component: ProgressBarComponent, description: "使用可自定义的进度条可视化进度" },
    { id: 'mood-tracker', title: '心情追踪器', component: MoodTracker, description: "记录和可视化你的每日心情变化" },
  ];

  const copyEmbedCode = (id) => {
    const embedCode = `https://anan421.github.io/anan.notion.github.io/#/${id}`;
    navigator.clipboard.writeText(embedCode);
    alert('Notion组件链接已复制到剪贴板！');
  };

  return (
    <Router>
      <div className="App bg-pink-100 min-h-screen relative">
        <CuteDecoration />
        <header className="bg-pink-300 text-white p-4 shadow-md">
          <h1 className="text-2xl font-bold text-center">安安的 Notion 百科</h1>
        </header>
        <main className="container mx-auto px-4 py-8">
          <p className="text-center text-pink-600 mb-8">精心挑选的 Notion 组件集合 - 轻松复制并嵌入使用 ❤️</p>
          <Routes>
            {components.map(({ id, component: Component }) => (
              <Route key={id} path={`/${id}`} element={<ComponentWrapper component={Component} />} />
            ))}
            <Route path="/" element={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {components.map(({ id, title, component: Component, description }) => (
                  <div key={id} id={id} className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg border-2 border-pink-200">
                    <h2 className="text-xl font-bold mb-2 text-pink-500">{title}</h2>
                    <div className="mb-4">
                      <Component />
                    </div>
                    <p className="text-gray-600 mb-4">{description}</p>
                    <button onClick={() => copyEmbedCode(id)} className="flex items-center justify-center w-full bg-pink-400 text-white py-2 px-4 rounded hover:bg-pink-500 transition-colors">
                      <Heart className="mr-2" size={18} /> 复制小组件
                    </button>
                  </div>
                ))}
              </div>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
