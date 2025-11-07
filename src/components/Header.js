// src/components/Header.jsx
import React from 'react';
import './Header.css';

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