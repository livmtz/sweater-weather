// src/pages/HomePage.jsx

import React, { useState, useEffect } from 'react';
import { getWeatherData } from '../services/weatherService';
import { getOutfitSuggestion } from '../services/outfitService'; // <-- NOVO! Importa o especialista
import './HomePage.css';

function HomePage() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Formosa do Rio Preto');
  const [searchTerm, setSearchTerm] = useState("");

  // <-- NOVO! Estado para guardar a sugestão de look
  const [suggestion, setSuggestion] = useState(null);

  useEffect(() => {
    if (city === "") return;

    const fetchData = async () => {
      setWeatherData(null);
      setSuggestion(null); // <-- NOVO! Limpa a sugestão antiga
      try {
        // 1. Pega os dados do clima
        const data = await getWeatherData(city);
        setWeatherData(data);

        // 2. CHAMA O ESPECIALISTA!
        const outfit = getOutfitSuggestion(data);
        setSuggestion(outfit); // 3. Guarda a sugestão no estado

      } catch (error) {
        console.error("Falha ao buscar dados do clima:", error);
        alert("Não foi possível encontrar esta cidade. Tente novamente.");
      }
    };

    fetchData();
  }, [city]);

  const handleSearch = (event) => {
    event.preventDefault();
    setCity(searchTerm);
  };

  return (
    <main className="home-page-container">
      <h2>Encontre o look perfeito para o clima de hoje!</h2>

      <form className="search-form" onSubmit={handleSearch}>
        <input 
          type="text"
          className="search-input"
          placeholder="Digite o nome da cidade"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-button">Buscar</button>
      </form>

      {/* Se está carregando, mostra "Carregando..." */}
      {!weatherData && city !== "" && <p>Carregando dados do clima...</p>}

      {/* Se JÁ TEMOS dados, mostramos o card do clima */}
      {weatherData && (
        <div className="weather-card">
          <h3>{weatherData.name}</h3>
          <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
          <p className="description">{weatherData.weather[0].description}</p>
          <p>Sensação térmica: {Math.round(weatherData.main.feels_like)}°C</p>
        </div>
      )}

      {/* <-- NOVO! Se JÁ TEMOS uma sugestão, mostramos o card de look */}
      {suggestion && (
        <div className="suggestion-card">
          <h4>Sugestão de Look 👕</h4>
          <p><strong>Look:</strong> {suggestion.look}</p>
          <p><strong>Tecidos para usar:</strong> {suggestion.tecidosUsar}</p>
          <p><strong>Tecidos a evitar:</strong> {suggestion.tecidosEvitar}</p>
        </div>
      )}
    </main>
  );
}

export default HomePage;