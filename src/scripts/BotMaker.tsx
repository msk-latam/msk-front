'use client'
import { useEffect } from 'react';

import { usePathname } from 'next/navigation'
const BotMaker = () => {
    const pathname = usePathname()

    useEffect(() => {
        const countries = ["ar", "cl", "ec"];

        const onValidCountry = pathname.split("/").some(part => countries.includes(part));

        if (!onValidCountry) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = 'https://go.botmaker.com/rest/webchat/p/XG5DC3KZSF/init.js';
            document.body.appendChild(script);
        }
    }, [pathname]);

    return null;
};

export default BotMaker;