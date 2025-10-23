// src/components/Header.jsx

// A primeira linha de todo componente React é quase sempre esta:
import React from 'react';

// Vamos também importar um arquivo de estilo que criaremos a seguir
import './Header.css';

// Esta é a declaração da função do nosso componente.
// O nome da função (Header) começa com letra maiúscula por convenção.
function Header() {
  // O 'return' define o que o componente vai renderizar na tela.
  // Usamos HTML, mas com a sintaxe especial do React chamada JSX.
  return (
    <header className="app-header">
      <h1>Sweater Weather 🧥</h1>
    </header>
  );
}

// A última linha exporta o componente para que outros arquivos possam usá-lo.
export default Header;