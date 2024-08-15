'use client';
import { useEffect, useState } from 'react';
const BotMaker = () => {
  const [mountedBot, setMountedBot] = useState(false);

  useEffect(() => {
    if (!mountedBot) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://go.botmaker.com/rest/webchat/p/XG5DC3KZSF/init.js';
      document.body.appendChild(script);
      setMountedBot(true);
    }
  }, []);

  return null;
};

export default BotMaker;
