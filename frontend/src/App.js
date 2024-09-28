import React from 'react';
import NewsletterPage from './NewsletterPage.js';
import './App.css';  // You can create and use a CSS file for styling

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to DEV@Deakin</h1>
        <p>Stay updated with our latest news by subscribing to our newsletter!</p>
      </header>
      <main>
        <NewsletterPage /> {/* Fixed the typo here */}
      </main>
    </div>
  );
}

export default App;
