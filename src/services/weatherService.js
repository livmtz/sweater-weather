// src/services/weatherService.js

const API_KEY = process.env.REACT_APP_WEATHERAPI_API_KEY;
const API_URL = 'https://api.weatherapi.com/v1/current.json';

export const getWeatherData = async (city) => {
  try {
    // A URL mudou e a forma de passar os parâmetros também é um pouco diferente
    const response = await fetch(`${API_URL}?key=${API_KEY}&q=${city}&lang=pt`);

    if (!response.ok) {
      throw new Error('Não foi possível obter os dados do clima.');
    }

    const data = await response.json();

    // ATENÇÃO: A estrutura da resposta é diferente!
    // Vamos "traduzir" a resposta da WeatherAPI para um formato que nosso componente já entende.
    const formattedData = {
      name: data.location.name,
      main: {
        temp: data.current.temp_c,
        feels_like: data.current.feelslike_c
      },
      weather: [
        {
          description: data.current.condition.text
        }
      ]
    };

    return formattedData;

  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    throw error;
  }
};