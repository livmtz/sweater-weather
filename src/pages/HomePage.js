// src/pages/HomePage.jsx

import React, { useState, useEffect } from 'react';
import { getWeatherData } from '../services/weatherService';
import { getOutfitSuggestion } from '../services/outfitService';
import { getOutfitImage } from '../services/imageService'; // <-- NOVO! Importa o serviço de imagem
import './HomePage.css';

function HomePage() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Formosa do Rio Preto');
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestion, setSuggestion] = useState(null);

  // <-- NOVO! Estado para guardar a URL da imagem do look
  const [outfitImageUrl, setOutfitImageUrl] = useState(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false); // <-- NOVO! Para mostrar "Carregando imagem..."

  // useEffect PRINCIPAL: busca dados do clima e gera sugestão
  useEffect(() => {
    if (city === "") return;

    const fetchData = async () => {
      setWeatherData(null);
      setSuggestion(null);
      setOutfitImageUrl(null); // <-- NOVO! Limpa a imagem antiga
      try {
        const data = await getWeatherData(city);
        setWeatherData(data);

        const outfit = getOutfitSuggestion(data);
        setSuggestion(outfit);

      } catch (error) {
        console.error("Falha ao buscar dados do clima:", error);
        alert("Não foi possível encontrar esta cidade. Tente novamente.");
      }
    };

    fetchData();
  }, [city]);

  // <-- NOVO useEffect: busca a imagem depois que a sugestão de look está pronta
  useEffect(() => {
    const fetchImage = async () => {
      if (suggestion && suggestion.look) { // Só busca se tiver uma sugestão de look
        setIsLoadingImage(true); // Começa a carregar
        const imageUrl = await getOutfitImage(suggestion.look); // Usa o texto do look como busca
        setOutfitImageUrl(imageUrl);
        setIsLoadingImage(false); // Terminou de carregar
      }
    };
    fetchImage();
  }, [suggestion]); // Roda sempre que a 'suggestion' (sugestão de look) mudar

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

      {/* Mensagem de carregamento do clima */}
      {!weatherData && city !== "" && <p>Carregando dados do clima...</p>}

      {/* Card do clima */}
      {weatherData && (
        <div className="weather-card">
          <h3>{weatherData.name}</h3>
          <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
          <p className="description">{weatherData.weather[0].description}</p>
          <p>Sensação térmica: {Math.round(weatherData.main.feels_like)}°C</p>
        </div>
      )}

      {/* Card de sugestão de look */}
      {suggestion && (
        <div className="suggestion-card">
          <h4>Sugestão de Look 👕</h4>
          {/* <-- NOVO! Exibe a imagem, se houver */}
          {isLoadingImage && <p>Carregando imagem do look...</p>}
          {!isLoadingImage && outfitImageUrl && (
            <div className="outfit-image-container">
              <img src={outfitImageUrl} alt="Sugestão de Look" className="outfit-image" />
            </div>
          )}
          {!isLoadingImage && !outfitImageUrl && <p>Nenhuma imagem relevante encontrada.</p>}

          <p><strong>Look:</strong> {suggestion.look}</p>
          <p><strong>Tecidos para usar:</strong> {suggestion.tecidosUsar}</p>
          <p><strong>Tecidos a evitar:</strong> {suggestion.tecidosEvitar}</p>
        </div>
      )}
    </main>
  );
}

export default HomePage;