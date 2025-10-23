// src/components/Footer.jsx

import React from 'react';
import './Footer.css'; // Importando o CSS que vamos criar

function Footer() {
  // O 'return' com o JSX do nosso rodapé
  return (
    <footer className="app-footer">
      {/* O &copy; é um código HTML para o símbolo de copyright © */}
      <p>&copy; 2025 Sweater Weather. Todos os direitos reservados.</p>
      <p>Desenvolvido com ❤️ para o projeto de Tópicos Avançados.</p>
    </footer>
  );
}

// Não se esqueça de exportar!
export default Footer;