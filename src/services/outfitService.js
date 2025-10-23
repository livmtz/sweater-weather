// src/services/outfitService.js

/**
 * Analisa os dados do clima e sugere um look.
 * @param {object} weatherData - O objeto de dados vindo da WeatherAPI (já formatado).
 * @returns {object} - Um objeto com a sugestão.
 */
export const getOutfitSuggestion = (weatherData) => {
  // Se não tiver dados, não retorna nada.
  if (!weatherData) {
    return null;
  }

  // Extraímos os dados que importam para a nossa decisão
  const temp = weatherData.main.temp;
  const feelsLike = weatherData.main.feels_like;
  const description = weatherData.weather[0].description.toLowerCase();

  let suggestion = {
    look: "Não foi possível sugerir um look.",
    tecidosUsar: "",
    tecidosEvitar: ""
  };

  // --- AQUI COMEÇA A NOSSA ÁRVORE DE DECISÃO (RF04) ---

  // REGRA 1: Clima Quente (baseado na sensação térmica)
  if (feelsLike >= 25) {
    suggestion = {
      look: "Verão: Camiseta leve, shorts ou saia e sandálias.",
      tecidosUsar: "Algodão, linho, viscose (tecidos leves e respiráveis).",
      tecidosEvitar: "Poliéster pesado, lã, couro."
    };
  }

  // REGRA 2: Clima Agradável
  else if (feelsLike >= 18 && feelsLike < 25) {
    suggestion = {
      look: "Casual: Camiseta ou camisa leve e calça jeans.",
      tecidosUsar: "Algodão, malha, jeans leve.",
      tecidosEvitar: "Lã pesada, tecidos muito grossos."
    };
  }

  // REGRA 3: Clima Fresco ( Sweater Weather! )
  else if (feelsLike >= 12 && feelsLike < 18) {
    suggestion = {
      look: "É dia de Suéter! Use um suéter leve, calça e sapatos fechados.",
      tecidosUsar: "Tricô leve, moletom, flanela.",
      tecidosEvitar: "Linho, viscose (muito finos)."
    };
  }

  // REGRA 4: Clima Frio
  else if (feelsLike < 12) {
    suggestion = {
      look: "Look Inverno: Casaco pesado, suéter de lã, cachecol e botas.",
      tecidosUsar: "Lã, fleece, tecidos térmicos, couro.",
      tecidosEvitar: "Algodão leve, linho (não retêm calor)."
    };
  }

  // REGRA 5: Ajuste para Chuva
  if (description.includes('chuva') || description.includes('rain')) {
    suggestion.look += " E não se esqueça de um guarda-chuva e uma jaqueta impermeável!";
    suggestion.tecidosUsar += " Tecidos impermeáveis (nylon).";
    suggestion.tecidosEvitar += " Evite algodão e jeans (demoram para secar!).";
  }

  return suggestion;
};