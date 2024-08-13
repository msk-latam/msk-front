'use client';
import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';
const BotMaker = () => {
  const pathname = usePathname();
  const [mountedBot, setMountedBot] = useState(false);

  useEffect(() => {
    const countries = [''];

    const onValidCountry = pathname
      .split('/')
      .some(part => countries.includes(part));

    if (!onValidCountry && !mountedBot) {
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
