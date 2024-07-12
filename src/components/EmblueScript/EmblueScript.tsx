"use client";
import { useEffect } from "react";

const EmblueScript = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `
          (function(d,t,u,s,c,f){
            f=function(m){
              m=new Date();
              return m.getFullYear()+''+(m.getMonth()+1)+''+m.getDate()+'T'+m.getHours()+''+m.getMinutes()+''+m.getSeconds()
            };
            u='https://widgets-static.embluemail.com/accounts/18929651EFC2296766/scripts/sw_18929.js?ts='+f();
            s=d.createElement(t);
            s.async=1;
            s.src=u;
            c=d.getElementsByTagName(t)[0];
            c.parentNode.insertBefore(s,c);
          })(document,'script');
        `;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default EmblueScript;
