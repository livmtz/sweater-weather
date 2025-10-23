// src/services/outfitService.js

export const getOutfitSuggestion = (weatherData) => {
  if (!weatherData) return null;

  const feelsLike = weatherData.main.feels_like;
  const description = weatherData.weather[0].description.toLowerCase();

  let suggestion = {
    look: "Não foi possível sugerir um look.",
    tecidosUsar: "",
    tecidosEvitar: "",
    imageQuery: "person shrugging" // Busca padrão
  };

  // REGRA 1: Clima Quente
  if (feelsLike >= 25) {
    suggestion = {
      look: "Look Verão: Camiseta leve, shorts ou saia e sandálias.",
      tecidosUsar: "Algodão, linho, viscose (tecidos leves e respiráveis).",
      tecidosEvitar: "Poliéster pesado, lã, couro.",
      imageQuery: "summer outfit" // <-- TERMO DE BUSCA
    };
  }
  // REGRA 2: Clima Agradável
  else if (feelsLike >= 18 && feelsLike < 25) {
    suggestion = {
      look: "Look Casual: Camiseta ou camisa leve e calça jeans.",
      tecidosUsar: "Algodão, malha, jeans leve.",
      tecidosEvitar: "Lã pesada, tecidos muito grossos.",
      imageQuery: "casual outfit jeans" // <-- TERMO DE BUSCA
    };
  }
  // REGRA 3: Clima Fresco ( Sweater Weather! )
  else if (feelsLike >= 12 && feelsLike < 18) {
    suggestion = {
      look: "É dia de Suéter! Use um suéter leve, calça e sapatos fechados.",
      tecidosUsar: "Tricô leve, moletom, flanela.",
      tecidosEvitar: "Linho, viscose (muito finos).",
      imageQuery: "sweater weather outfit" // <-- TERMO DE BUSCA
    };
  }
  // REGRA 4: Clima Frio
  else if (feelsLike < 12) {
    suggestion = {
      look: "Look Inverno: Casaco pesado, suéter de lã, cachecol e botas.",
      tecidosUsar: "Lã, fleece, tecidos térmicos, couro.",
      tecidosEvitar: "Algodão leve, linho (não retêm calor).",
      imageQuery: "winter coat outfit" // <-- TERMO DE BUSCA
    };
  }

  // REGRA 5: Ajuste para Chuva
  if (description.includes('chuva') || description.includes('rain')) {
    suggestion.look += " E não se esqueça de um guarda-chuva e uma jaqueta impermeável!";
    suggestion.tecidosUsar += " Tecidos impermeáveis (nylon).";
    suggestion.tecidosEvitar += " Evite algodão e jeans (demoram para secar!).";
    suggestion.imageQuery = "rainy day outfit"; // <-- Sobrescreve a busca se chover
  }

  return suggestion;
};