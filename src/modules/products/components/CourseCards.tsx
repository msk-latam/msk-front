import React from "react";

const features = [
  {
    icon: (
      <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.0003 23.8348H4.66699M8.66699 16.5015H2.66699M12.0003 9.16813H5.33366M22.667 4.50146L13.8717 16.8148C13.4825 17.3598 13.2878 17.6323 13.2962 17.8595C13.3036 18.0573 13.3984 18.2416 13.5551 18.3626C13.7351 18.5015 14.07 18.5015 14.7397 18.5015H21.3337L20.0003 28.5015L28.7956 16.1881C29.1849 15.6431 29.3795 15.3706 29.3711 15.1434C29.3637 14.9456 29.2689 14.7613 29.1122 14.6404C28.9322 14.5015 28.5973 14.5015 27.9276 14.5015H21.3337L22.667 4.50146Z" stroke="#9200AD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Asimilación progresiva de tus conocimientos",
    description: "Aprendizaje asincrónico con contenido estructurado.",
  },
  {
    icon: (
      <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.3336 11.168V7.16797L25.3336 3.16797L26.6669 5.83464L29.3336 7.16797L25.3336 11.168H21.3336ZM21.3336 11.168L16.0003 16.5012M29.3337 16.5013C29.3337 23.8651 23.3641 29.8346 16.0003 29.8346C8.63653 29.8346 2.66699 23.8651 2.66699 16.5013C2.66699 9.13751 8.63653 3.16797 16.0003 3.16797M22.667 16.5013C22.667 20.1832 19.6822 23.168 16.0003 23.168C12.3184 23.168 9.33366 20.1832 9.33366 16.5013C9.33366 12.8194 12.3184 9.83464 16.0003 9.83464" stroke="#9200AD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Autonomía en el desarrollo de tu cursada",
    description: "Gestiona tus tiempos y avanza de acuerdo con tus posibilidades.",
  },
  {
    icon: (
      <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 10.9015C4 8.66125 4 7.54115 4.43597 6.6855C4.81947 5.93285 5.43139 5.32093 6.18404 4.93744C7.03969 4.50146 8.15979 4.50146 10.4 4.50146H21.6C23.8402 4.50146 24.9603 4.50146 25.816 4.93744C26.5686 5.32093 27.1805 5.93285 27.564 6.6855C28 7.54115 28 8.66125 28 10.9015V18.5015C28 20.3652 28 21.2971 27.6955 22.0322C27.2895 23.0123 26.5108 23.791 25.5307 24.197C24.7957 24.5015 23.8638 24.5015 22 24.5015C21.3486 24.5015 21.0228 24.5015 20.7207 24.5728C20.3177 24.6679 19.9425 24.8555 19.6247 25.1208C19.3863 25.3197 19.1909 25.5803 18.8 26.1015L16.8533 28.697C16.5638 29.083 16.4191 29.276 16.2416 29.345C16.0862 29.4055 15.9138 29.4055 15.7584 29.345C15.5809 29.276 15.4362 29.083 15.1467 28.697L13.2 26.1015C12.8091 25.5803 12.6137 25.3197 12.3753 25.1208C12.0575 24.8555 11.6823 24.6679 11.2793 24.5728C10.9772 24.5015 10.6514 24.5015 10 24.5015C8.13623 24.5015 7.20435 24.5015 6.46927 24.197C5.48915 23.791 4.71046 23.0123 4.30448 22.0322C4 21.2971 4 20.3652 4 18.5015V10.9015Z" stroke="#9200AD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M15.9963 11.6089C14.93 10.3969 13.1519 10.0709 11.8158 11.1807C10.4798 12.2906 10.2917 14.1461 11.3409 15.4587C11.9648 16.2392 13.4929 17.6389 14.6292 18.6454C15.0983 19.0608 15.3328 19.2686 15.6151 19.3528C15.8567 19.4249 16.136 19.4249 16.3776 19.3528C16.6599 19.2686 16.8944 19.0608 17.3635 18.6454C18.4998 17.6389 20.0279 16.2392 20.6518 15.4587C21.701 14.1461 21.5358 12.2789 20.1769 11.1807C18.8179 10.0826 17.0627 10.3969 15.9963 11.6089Z" stroke="#9200AD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Asesoramiento académico personalizado",
    description: "Recibe acompañamiento durante todo tu proceso de aprendizaje.",
  },
];

const CourseOverview: React.FC = () => {
  return (
    <section className="max-w-5xl mx-auto">
      <div className="grid gap-4 md:grid-cols-3">
        {features.map((item, index) => (
          <div key={index} className="rounded-[38px] py-6 px-5 shadow-sm bg-white">
            <div className="flex font-raleway text-xl font-bold justify-start pl-2 mb-3">{item.icon}</div>
            <h3 className="font-raleway font-bold text-md text-[#1A1A1A] mb-2 break-words w-full text-left">{item.title}</h3>
            <p className="text-sm font-inter font-normal text-[#1A1A1A] text-left">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseOverview;
