import React from 'react';
import { useEffect } from 'react';
import './App.css';
import logo from './mba.svg'; // Make sure you have a logo.svg file in your src folder


function App() {
 
 

  useEffect(() => {
    const handleMouseMove = (e) => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      document.body.appendChild(particle);
      const size = Math.random() * 10 + 2;
      particle.style.width = particle.style.height = `${size}px`;
      
      // Set the particle color to a pink or purple
      const color = Math.random() > 0.5 ? 'rgba(255, 105, 180, 1)' : 'rgba(128, 0, 128, 1)';
      particle.style.backgroundColor = color;

      const posX = e.clientX - size / 2;
      const posY = e.clientY - size / 2;
      particle.style.left = `${posX}px`;
      particle.style.top = `${posY}px`;

      const deltaX = (Math.random() - 0.5) * 50;
      const deltaY = (Math.random() - 0.5) * 50;
      setTimeout(() => {
        particle.style.opacity = '0';
        particle.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      }, 1);

      setTimeout(() => {
        particle.remove();
      }, 800);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

    return (
        <div className="App">
          <title>MBA</title>
            <div className="logo-circle">
                <img src={logo} alt="MBA Logo" />
            </div>
        </div>
    );
}

export default App;
