import React from 'react';
import { Clipboard } from 'lucide-react';

const ComponentCard = ({ title, description, embedCode, previewComponent }) => (
  <div className="bg-white rounded-lg shadow-md p-6 m-4 transition-all hover:shadow-lg">
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <div className="mb-4">
      {previewComponent}
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <button
      onClick={() => {
        navigator.clipboard.writeText(embedCode);
        alert('Embed code copied to clipboard!');
      }}
      className="flex items-center justify-center w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
    >
      <Clipboard className="mr-2" size={18} />
      Copy Embed Code
    </button>
  </div>
);

const ComponentGallery = () => {
  const components = [
    {
      title: "Notion Progress Widget",
      description: "Track your progress with year, month, and week views.",
      embedCode: "<iframe src='http://localhost:3000/#notion-progress-widget'></iframe>",
      previewComponent: <NotionProgressWidget />
    },
    {
      title: "Calendar Component",
      description: "A simple calendar for tracking events and deadlines.",
      embedCode: "<iframe src='http://localhost:3000/#calendar'></iframe>",
      previewComponent: <CalendarComponent />
    },
    // Add more components here as needed
  ];

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-8">Notion Components</h1>
      <p className="text-center text-gray-600 mb-8">Curated collection of Notion components - Copy and embed with ease</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {components.map((component, index) => (
          <ComponentCard key={index} {...component} />
        ))}
      </div>
    </div>
  );
};

export default ComponentGallery;