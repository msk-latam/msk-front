'use client';
import { useEffect, useState } from 'react';

const BotMaker = () => {
  const [mountedBot, setMountedBot] = useState(false);
  const [botVisible, setBotVisible] = useState(true);

  useEffect(() => {
    if (!mountedBot) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://go.botmaker.com/rest/webchat/p/XG5DC3KZSF/init.js';
      document.body.appendChild(script);
      setMountedBot(true);
    }

    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const isMobile = window.innerWidth <= 768;
      const threshold = document.body.offsetHeight - (isMobile ? 2100 : 1100);

      if (scrollPosition >= threshold) {
        setBotVisible(false);
      } else {
        setBotVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mountedBot]);

  useEffect(() => {
    const botElement = document.querySelector(
      'iframe[title="Botmaker"]',
    ) as HTMLIFrameElement;

    if (botElement) {
      botElement.style.display = botVisible ? 'block' : 'none';
    }
  }, [botVisible]);

  return null;
};

export default BotMaker;
