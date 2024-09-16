import React, { useState, useEffect } from 'react';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faLinkedin,
  faDiscord,
  faNodeJs,
  faPython,
  faHtml5,
  faJsSquare,
  faCss3Alt,
  faJava,
} from '@fortawesome/free-brands-svg-icons';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import Logo from './assets/mba.svg';

const App = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [openWindows, setOpenWindows] = useState({
    about: false,
    projects: false,
    skills: false,
  });

  const [displayedText, setDisplayedText] = useState('');
  const texts = ['designer', 'programmer', 'developer'];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1200, easing: 'ease-out-quart' });
  }, []);

  useEffect(() => {
    const typeSpeed = typing ? 150 : 100;
    const typingDelay = typing ? 2000 : 1000;

    if (typing && charIndex === texts[currentTextIndex].length) {
      setTimeout(() => setTyping(false), typingDelay);
    } else if (!typing && charIndex === 0) {
      setTimeout(() => {
        setTyping(true);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }, typingDelay);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) =>
          typing
            ? texts[currentTextIndex].slice(0, charIndex + 1)
            : texts[currentTextIndex].slice(0, charIndex - 1)
        );
        setCharIndex((prev) => (typing ? prev + 1 : prev - 1));
      }, typeSpeed);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, typing, currentTextIndex, texts]);

  const handleOpenWindow = (section) => {
    setOpenWindows((prev) => ({ ...prev, [section]: true }));
    setIsNavVisible(false); // Close nav when a window is opened
  };

  const handleCloseWindow = (section) => {
    setOpenWindows((prev) => ({ ...prev, [section]: false }));
  };

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  // Default positions for draggable windows
  const windowPositions = {
    about: { x: -150, y: -150 },
    projects: { x: 150, y: -150 },
    skills: { x: 0, y: 150 },
  };

  // Skills data
  const skills = [
    {
      name: 'Node.js',
      icon: faNodeJs,
      color: '#68A063',
      percentage: 30,
    },
    {
      name: 'Python',
      icon: faPython,
      color: '#3776AB',
      percentage: 70,
    },
    {
      name: 'C++',
      icon: faCode,
      color: '#00599C',
      percentage: 79,
    },
    {
      name: 'Java',
      icon: faJava,
      color: '#007396',
      percentage: 85,
    },
    {
      name: 'HTML/CSS/JS',
      icon: faHtml5,
      color: '#E34F26',
      percentage: 65,
    },
  ];

  return (
    <div className="app">
      {/* Logo button */}
      <div className="logo" onClick={toggleNav}>
        <img src={Logo} alt="Logo" />
      </div>

      {/* Dynamic text with typing effect */}
      <div className="intro-text" data-aos="fade-up">
        <h1>
          I am MBA, I'm <span className="glow-text">{displayedText}</span>
        </h1>
      </div>

      {/* Navigation Menu */}
      {isNavVisible && (
        <div className="navigation-menu">
          <button onClick={() => handleOpenWindow('about')}>About</button>
          <button onClick={() => handleOpenWindow('projects')}>Projects</button>
          <button onClick={() => handleOpenWindow('skills')}>Skills</button>
        </div>
      )}

      {/* Social Media Icons in the Bottom Right */}
      <div className="social-media">
        <a href="https://github.com/MBA2022" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a
          href="https://www.linkedin.com/in/mohammad-amr-955408272/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="https://discord.gg/gTQ9vjZ8Mn" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faDiscord} />
        </a>
      </div>

      {/* Draggable windows */}
      {openWindows.about && (
        <Draggable defaultPosition={windowPositions.about}>
          <div className="window about">
            <div className="window-header">
              <span>About Me</span>
              <button className="close-btn" onClick={() => handleCloseWindow('about')}>
                &times;
              </button>
            </div>
            <div className="window-content">
              <h2>Overview</h2>
              <p>
                I'm a passionate developer focused on building efficient and innovative solutions.
                With experience in various programming languages and frameworks, I enjoy tackling new challenges and continuously learning.
              </p>
            </div>
          </div>
        </Draggable>
      )}

      {openWindows.projects && (
        <Draggable defaultPosition={windowPositions.projects}>
          <div className="window projects">
            <div className="window-header">
              <span>Projects</span>
              <button className="close-btn" onClick={() => handleCloseWindow('projects')}>
                &times;
              </button>
            </div>
            <div className="window-content">
              {/* Project Cards */}
              <div className="project-card">
                <h3>Dencryption App</h3>
                <p>An app for encrypting and decrypting data securely.</p>
                <a
                  href="https://github.com/MBA2022/Dencryption-app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
              </div>
              <div className="project-card">
                <h3>SysBot</h3>
                <p>A Discord bot for system management and automation.</p>
                <a
                  href="https://github.com/MBA2022/SysBot"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
              </div>
              <div className="project-card">
                <h3>Student DB</h3>
                <p>A student database management system.</p>
                <a
                  href="https://github.com/MBA2022/Student-DB"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </Draggable>
      )}

      {openWindows.skills && (
        <Draggable defaultPosition={windowPositions.skills}>
          <div className="window skills">
            <div className="window-header">
              <span>Skills</span>
              <button className="close-btn" onClick={() => handleCloseWindow('skills')}>
                &times;
              </button>
            </div>
            <div className="window-content">
              {/* Skill Cards */}
              {skills.map((skill, index) => (
                <div className="skill-card" key={index}>
                  <div className="skill-logo">
                    <FontAwesomeIcon icon={skill.icon} size="2x" color={skill.color} />
                  </div>
                  <div className="skill-info">
                    <h3>{skill.name}</h3>
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{ width: `${skill.percentage}%`, backgroundColor: skill.color }}
                      >
                        <span className="progress-text">{skill.percentage}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
};

export default App;
