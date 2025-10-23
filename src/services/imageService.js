// src/services/imageService.js

const API_KEY = process.env.REACT_APP_PEXELS_API_KEY;
const API_URL = 'https://api.pexels.com/v1/search';

export const getOutfitImage = async (query) => {
  if (!query) return null; // Não busca se a query estiver vazia

  try {
    const response = await fetch(`${API_URL}?query=${query}&per_page=1`, {
      headers: {
        Authorization: API_KEY, // A Pexels usa a chave no cabeçalho
      },
    });

    if (!response.ok) {
      throw new Error('Não foi possível obter a imagem do look.');
    }

    const data = await response.json();

    // Retorna a URL da imagem, se houver
    if (data.photos && data.photos.length > 0) {
      return data.photos[0].src.medium; // Escolhemos o tamanho 'medium'
    }
    return null; // Nenhuma imagem encontrada
  } catch (error) {
    console.error("Erro ao buscar imagem da API Pexels:", error);
    return null; // Retorna null em caso de erro
  }
};