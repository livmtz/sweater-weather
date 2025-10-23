// src/pages/HomePage.jsx

import React, { useState, useEffect } from 'react';
import { getWeatherData } from '../services/weatherService';
import { getOutfitSuggestion } from '../services/outfitService';
import { getOutfitImage } from '../services/imageService';
import './HomePage.css';

function HomePage() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Formosa do Rio Preto');
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestion, setSuggestion] = useState(null);
  
  const [outfitImageUrl, setOutfitImageUrl] = useState(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  // useEffect PRINCIPAL: busca dados do clima e gera sugestão
  useEffect(() => {
    if (city === "") return;

    const fetchData = async () => {
      setWeatherData(null);
      setSuggestion(null);
      setOutfitImageUrl(null); 
      try {
        // 1. Pega os dados do clima
        const data = await getWeatherData(city);
        setWeatherData(data);

        // 2. CHAMA O ESPECIALISTA!
        const outfit = getOutfitSuggestion(data);
        setSuggestion(outfit);

      } catch (error) {
        console.error("Falha ao buscar dados do clima:", error);
        alert("Não foi possível encontrar esta cidade. Tente novamente.");
      }
    };

    fetchData();
  }, [city]);

  // useEffect SECUNDÁRIO: busca a imagem DEPOIS que a sugestão está pronta
  useEffect(() => {
    const fetchImage = async () => {
      // Só busca se tiver uma sugestão E um termo de busca de imagem
      if (suggestion && suggestion.imageQuery) { 
        setIsLoadingImage(true);
        const imageUrl = await getOutfitImage(suggestion.imageQuery);
        
        setOutfitImageUrl(imageUrl); // <-- Esta é a linha que corrige o aviso
        
        setIsLoadingImage(false);
      }
    }
    fetchImage();
  }, [suggestion]); // Roda sempre que a 'suggestion' (sugestão de look) mudar

  // Função que é chamada quando o formulário é enviado
  const handleSearch = (event) => {
    event.preventDefault(); // Impede a página de recarregar
    setCity(searchTerm);    // ATIVA A MÁGICA! Atualiza a 'city' e dispara o useEffect
  };

  // PARTE VISUAL DA PÁGINA
  return (
    <main className="home-page-container">
      <h2>Encontre o look perfeito para o clima de hoje!</h2>

      {/* Formulário de busca */}
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

      {/* Se JÁ TEMOS uma sugestão, mostramos o card de look */}
      {suggestion && (
        <div className="suggestion-card">
          <h4>Sugestão de Look 👕</h4>
          
          {/* Exibe a imagem, se houver */}
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