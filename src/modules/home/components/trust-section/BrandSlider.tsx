"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "react-feather";

interface BrandSliderProps {
  country: string;
}

const BrandSlider: FC<BrandSliderProps> = ({ country }) => {
  const [brands, setBrands] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const mobileScrollRef = useRef<HTMLDivElement | null>(null);
  const desktopScrollRef = useRef<HTMLDivElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragMoved, setDragMoved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    (async () => {
      const fetchedBrands = await fetchBrands(country);
      setBrands(fetchedBrands);
    })();
  }, [country]);

  useEffect(() => {
    const container = desktopScrollRef.current;
    if (!container || isDragging || isHovered) return;

    const scrollInterval = setInterval(() => {
      const scrollPosition = container.scrollLeft + container.offsetWidth;
      const atEnd = scrollPosition >= container.scrollWidth;

      if (atEnd) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 200, behavior: "smooth" });
      }
    }, 1500);

    return () => clearInterval(scrollInterval);
  }, [isDragging, isHovered]);

  const fetchBrands = async (country: string) => {
    try {
      const getUrl = () => {
        const host = window.location.hostname;
        return host !== "localhost" ? `https://${host}` : "http://localhost:3000";
      };

      const mappedCountry = country === "ar" ? "arg" : country;
      const url = `${getUrl()}/instituciones/${country}.json`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Error al obtener marcas");

      const data = await response.json();
      const processUrl = (url: string) => {
        let processed = url.replace(/^https?:\/\/[a-z]{2}\./, "https://");
        if (!processed.includes("//wp.")) {
          processed = processed.replace("//", "//wp.");
        }
        return processed;
      };

      return data.length
        ? data.map((item: any) => ({
            ...item,
            imgDefault: processUrl(item.imgDefault),
            imgHover: processUrl(item.imgHover),
          }))
        : await fetchDefaultBrands();
    } catch (error) {
      console.error(error);
      return await fetchDefaultBrands();
    }
  };

  const fetchDefaultBrands = async () => {
    try {
      const response = await fetch("https://wp.msklatam.com/wp-json/wp/api/carrusel-instituciones?lang=int");
      if (!response.ok) throw new Error("Error al obtener marcas por defecto");
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };

const scrollToIndex = (index: number) => {
  if (!mobileScrollRef.current) return;

  const container = mobileScrollRef.current;
  const clampedIndex = (index + brands.length) % brands.length;
  const child = container.children[clampedIndex] as HTMLElement;
  setCurrentIndex(clampedIndex);
  child?.scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "nearest", // ✅ evita scroll vertical no deseado
  });
};


  const handleMouseDown = (e: React.MouseEvent) => {
    const container = desktopScrollRef.current;
    if (!container) return;
    setIsDragging(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
    setDragMoved(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const container = desktopScrollRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = x - startX;
    container.scrollLeft = scrollLeft - walk;
    if (Math.abs(walk) > 5) setDragMoved(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (dragMoved) e.preventDefault();
  };

  const handleWheel = (e: React.WheelEvent) => {
    const container = desktopScrollRef.current;
    if (!container) return;
    container.scrollBy({ left: e.deltaY > 0 ? 200 : -200, behavior: "smooth" });
  };

  const preventImageDrag = (e: React.DragEvent) => e.preventDefault();

  return (
    <div className="relative md:overflow-hidden overflow-visible pb-5">
      {/* Desktop: Difuminado */}
      <div className="hidden md:block absolute top-0 left-0 z-10 w-16 h-full pointer-events-none bg-gradient-to-r from-white via-white/70 to-transparent" />
      <div className="hidden md:block absolute top-0 right-0 z-10 w-16 h-full pointer-events-none bg-gradient-to-l from-white via-white/70 to-transparent" />

      {/* Mobile view centrado tipo carrusel */}
{/* Mobile view centrado tipo carrusel */}
<div className="md:hidden relative overflow-visible py-6">
  <div
    ref={mobileScrollRef}
    className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
  >
    {brands.map((brand, index) => (
      <div
        key={index}
        className="flex-shrink-0 snap-center bg-[#F7F9FF] rounded-[30px] px-9 py-6 w-[85%] transition-transform duration-300"
      >
        <a
          href={brand.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center h-32"
          onDragStart={preventImageDrag}
          onClick={(e) => dragMoved && e.preventDefault()}
        >
          <Image
            src={brand.imgDefault}
            alt="Brand logo"
            width={brand.width}
            height={100}
            className="object-contain"
          />
        </a>
      </div>
    ))}
  </div>

  {/* Botones navegación mobile */}
  <button
  type="button"
    onClick={() => scrollToIndex(currentIndex - 1)}
    className="absolute -bottom-10 left-4 -translate-y-1/2 bg-white border border-gray-300 w-9 h-9 rounded-full shadow-md flex items-center justify-center z-10"
  >
    <ChevronLeft size={20} className="mx-auto"/>
  </button>
  <button
  type="button"
    onClick={() => scrollToIndex(currentIndex + 1)}
    className="absolute -bottom-10 right-4 -translate-y-1/2 bg-white border border-gray-300 w-9 h-9 rounded-full shadow-md flex items-center justify-center z-10"
  >
    <ChevronRight size={20} className="mx-auto"/>
  </button>
</div>


      {/* Desktop view scrollable */}
      <div
        ref={desktopScrollRef}
        className="hidden md:flex py-4 pl-16 space-x-4 overflow-x-auto scrollbar-hide overscroll-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {brands.map((brand: any, index: number) => (
          <div
            key={index}
            className="flex-shrink-0 group bg-[#F7F9FF] rounded-[30px] px-9 py-6"
          >
            <a
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center md:w-32 h-20"
              onDragStart={preventImageDrag}
              onClick={handleClick}
            >
              <Image
                src={brand.imgDefault}
                alt="Brand logo"
                width={brand.width}
                height={100}
                className="object-contain transition-all duration-500 ease-in-out opacity-100 group-hover:hidden"
              />
              <Image
                src={brand.imgHover}
                alt="Brand logo hover"
                width={brand.width}
                height={100}
                className="hidden object-contain transition-all duration-500 ease-in-out opacity-0 group-hover:block group-hover:opacity-100"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandSlider;




// "use client";
// import React, { FC, useEffect, useRef, useState } from "react";
// import { BRANDS_BY_COUNTRY } from "@/data/MSK/brands";
// import Image from "next/image";

// interface BrandSliderProps {
//   country: string;
// }

// const BrandSlider: FC<BrandSliderProps> = ({ country }) => {
//   function getUrl() {
//     let host = window.location.hostname;
//     let url = "http://localhost:3000";
//     if (host != "localhost") {
//       return `https://${host}`;
//     }
//     return url;
//   }
//   async function fetchBrands(country: any) {
//     try {
//       const mappedCountry = country === "ar" ? "arg" : country;
//       // const url = `https://wp.msklatam.com/wp-json/wp/api/carrusel-instituciones?country=${mappedCountry}&lang=${mappedCountry}`;
//       const url = `${getUrl()}/instituciones/${country}.json`;

//       const response = await fetch(url);

//       if (!response.ok) {
//         throw new Error(`Error al obtener los datos: ${response.statusText}`);
//       }

//       const data = await response.json();

//       const processedData = data.map((item: any) => {
//         const removeCountryFromUrl = (url: string) => {
//           let processedUrl = url.replace(/^https?:\/\/[a-z]{2}\./, "https://");

//           if (!processedUrl.includes("//wp.")) {
//             processedUrl = processedUrl.replace("//", "//wp.");
//           }

//           return processedUrl;
//         };

//         return {
//           ...item,
//           imgDefault: removeCountryFromUrl(item.imgDefault),
//           imgHover: removeCountryFromUrl(item.imgHover),
//         };
//       });

//       return processedData.length > 0
//         ? processedData
//         : await fetchDefaultBrands();
//     } catch (error) {
//       console.error("Error al obtener las marcas:", error);
//       return await fetchDefaultBrands();
//     }
//   }

//   async function fetchDefaultBrands() {
//     try {
//       const url =
//         "https://wp.msklatam.com/wp-json/wp/api/carrusel-instituciones?lang=int";
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(
//           `Error al obtener las marcas por defecto: ${response.statusText}`
//         );
//       }
//       return await response.json();
//     } catch (error) {
//       console.error("Error al obtener las marcas por defecto:", error);
//       return [];
//     }
//   }

//   // const brands = BRANDS_BY_COUNTRY[country] || BRANDS_BY_COUNTRY['default'];
//   const scrollContainerRef = useRef<HTMLDivElement | null>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);
//   const [dragMoved, setDragMoved] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [brands, setBrands] = useState<any>([]);

//   useEffect(() => {
//     (async () => {
//       const fetchedBrands = await fetchBrands(country);
//       setBrands(fetchedBrands);
//     })();
//   }, [country]);

//   useEffect(() => {
//     const container = scrollContainerRef.current;
//     if (!container || isDragging || isHovered) return;

//     let scrollInterval: NodeJS.Timeout;

//     const startScrolling = () => {
//       scrollInterval = setInterval(() => {
//         const scrollPosition = container.scrollLeft + container.offsetWidth;
//         const atEnd = scrollPosition >= container.scrollWidth;

//         if (atEnd) {
//           container.scrollTo({ left: 0, behavior: "smooth" });
//         } else {
//           container.scrollBy({ left: 200, behavior: "smooth" });
//         }
//       }, 1500);
//     };

//     startScrolling();

//     return () => {
//       clearInterval(scrollInterval);
//     };
//   }, [isDragging, isHovered]);

//   const handleMouseDown = (e: React.MouseEvent) => {
//     const container = scrollContainerRef.current;
//     if (!container) return;

//     setIsDragging(true);
//     setStartX(e.pageX - container.offsetLeft);
//     setScrollLeft(container.scrollLeft);
//     setDragMoved(false); // Resetear el estado de arrastre
//   };

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!isDragging) return;

//     e.preventDefault();
//     const container = scrollContainerRef.current;
//     if (!container) return;

//     const x = e.pageX - container.offsetLeft;
//     const walk = x - startX;
//     container.scrollLeft = scrollLeft - walk;

//     if (Math.abs(walk) > 5) {
//       // Si el desplazamiento es significativo, es arrastre
//       setDragMoved(true);
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//     setIsHovered(false);
//   };

//   const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     // Si hubo movimiento, prevenir el comportamiento por defecto
//     if (dragMoved) {
//       e.preventDefault();
//     }
//   };
// const scrollByOffset = (direction: number) => {
//   const container = scrollContainerRef.current;
//   if (!container) return;

//   const card = container.querySelector('div > div'); // encuentra la primera card
//   const cardWidth = card?.clientWidth || 300;

//   container.scrollBy({
//     left: direction * cardWidth,
//     behavior: "smooth",
//   });
// };

//   const handleWheel = (event: React.WheelEvent) => {
//     const container = scrollContainerRef.current;
//     if (!container) return;

//     container.scrollBy({
//       left: event.deltaY > 0 ? 200 : -200,
//       behavior: "smooth",
//     });
//   };

//   const preventImageDrag = (e: React.DragEvent) => {
//     e.preventDefault();
//   };

//   return (
//     <div className="relative">
//       {/* Difuminación izquierda */}
//       <div className="md:absolute hidden top-0 left-0 z-10 w-16 h-full pointer-events-none bg-gradient-to-r from-white via-white/70 to-transparent"></div>

//       {/* Difuminación derecha */}
//       <div className="md:absolute hidden top-0 right-0 z-10 w-16 h-full pointer-events-none bg-gradient-to-l from-white via-white/70 to-transparent"></div>

//       {/* Contenedor del slider */}
//       <div
//         className="flex py-4 pl-16 space-x-8 overflow-x-auto scrollbar-hide overscroll-none"
//         ref={scrollContainerRef}
//         onMouseEnter={() => setIsHovered(true)} // Detener el scroll automático
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         onMouseLeave={handleMouseUp}
//         onWheel={handleWheel}
//       >
// <div className="relative w-full">
//   {/* Botón izquierdo SOLO en mobile */}
//   <button
//     onClick={() => scrollByOffset(-1)}
//     className="absolute left-2 -bottom-10 transform -translate-y-1/2 z-20 bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center md:hidden"
//   >
//     &#x2039;
//   </button>

//   {/* Botón derecho SOLO en mobile */}
//   <button
//     onClick={() => scrollByOffset(1)}
//     className="absolute right-2 -bottom-10 transform -translate-y-1/2 z-20 bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center md:hidden"
//   >
//     &#x203A;
//   </button>

//   {/* Contenedor del slider */}
//   <div
//     className="
//       flex
//       py-4
//       md:pl-16 px-4
//       space-x-4
//       overflow-x-auto
//       scroll-smooth
//       scrollbar-hide
//       overscroll-none
//       md:snap-none snap-x snap-mandatory
//     "
//     ref={scrollContainerRef}
//     onMouseEnter={() => setIsHovered(true)}
//     onMouseDown={handleMouseDown}
//     onMouseMove={handleMouseMove}
//     onMouseUp={handleMouseUp}
//     onMouseLeave={handleMouseUp}
//     onWheel={handleWheel}
//   >
//     <div className="flex flex-row gap-4 w-full">
//       {brands?.map((brand: any, index: number) => (
//         <div
//           key={index}
//           className={`
//             flex-shrink-0 group bg-[#F7F9FF] rounded-[30px] px-6 py-6
//             snap-center
//             w-[85%] mx-auto md:w-auto md:mx-0
//           `}
//         >
//           <a
//             href={brand.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="relative flex items-center justify-center h-20 md:w-32 w-full"
//             onDragStart={preventImageDrag}
//             onClick={handleClick}
//           >
//             <Image
//               src={brand.imgDefault}
//               alt="Brand logo"
//               width={brand.width}
//               height={100}
//               className="object-contain transition-all duration-500 ease-in-out opacity-100 group-hover:hidden"
//             />
//             <Image
//               src={brand.imgHover}
//               alt="Brand logo hover"
//               width={brand.width}
//               height={100}
//               className="hidden object-contain transition-all duration-500 ease-in-out opacity-0 group-hover:block group-hover:opacity-100"
//             />
//           </a>
//         </div>
//       ))}
//     </div>
//   </div>
// </div>

//       </div>
//     </div>
//   );
// };

// export default BrandSlider;
