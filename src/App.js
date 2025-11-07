// src/App.jsx

import React from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Footer from './components/Footer'; 
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <HomePage />
      <Footer /> {/* 2. ADICIONAR O COMPONENTE AQUI */}
    </div>
  );
}

export default App;