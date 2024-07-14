const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    'NotionProgressWidget': path.resolve(__dirname, 'src/NotionProgressWidget.jsx'),
    'CalendarComponent': path.resolve(__dirname, 'src/CalendarComponent.jsx'),
    'ProgressBarComponent': path.resolve(__dirname, 'src/ProgressBarComponent.jsx'),
    'MoodTracker': path.resolve(__dirname, 'src/MoodTracker.jsx')
  })
);
