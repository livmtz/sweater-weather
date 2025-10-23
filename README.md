# 🧥 Sweater Weather

Projeto desenvolvido para a matéria de Tópicos Avançados. Esta é uma aplicação web construída em React que sugere looks de roupas com base no clima em tempo real de qualquer cidade do mundo.

**Link para o projeto no ar:** [sweater-weather-o1ov.vercel.app](https://sweater-weather-o1ov.vercel.app/)

## ✨ Funcionalidades Principais

* **Busca de Clima em Tempo Real:** Utiliza a [WeatherAPI](https://www.weatherapi.com/) para obter dados meteorológicos atualizados.
* **Motor de Sugestão de Roupas:** Um "cérebro" de regras (RF02, RF04) que analisa a sensação térmica, temperatura e condições (chuva) para sugerir um look.
* **Sugestão de Tecidos:** Recomenda tecidos ideais para usar e quais evitar com base no clima.
* **Interface Reativa:** Construído com componentes React, `useState` e `useEffect`.

## 🛠️ Tecnologias Utilizadas

* **Frontend:** React.js (criado com Create React App)
* **API de Clima:** WeatherAPI.com
* **Hospedagem (Deploy):** Vercel
* **Versionamento:** Git & GitHub

## 🚀 Como rodar este projeto localmente

1.  Clone este repositório:
    `git clone https://github.com/livmtz/sweater-weather.git`

2.  Entre na pasta do projeto:
    `cd sweater-weather`

3.  Instale as dependências:
    `npm install`

4.  Crie um arquivo `.env.local` na raiz do projeto e adicione sua chave da API:
    `REACT_APP_WEATHERAPI_API_KEY=SUA_CHAVE_SECRETA_AQUI`

5.  Inicie o servidor de desenvolvimento:
    `npm start`