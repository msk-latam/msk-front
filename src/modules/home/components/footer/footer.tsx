'use client';

const Footer = () => {
  return (
    <footer className="bg-black w-full px-6 py-10 md:py-14 text-sm">
      <div className="max-w-screen-2xl mx-auto flex flex-col-reverse md:flex-row justify-between items-start gap-10 md:gap-16 min-h-[400px] md:min-h-[250px]">

        {/* BLOQUE IZQUIERDO */}
        <div className="w-full md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start gap-4 md:gap-2 text-white font-inter">
          <img src="/images/footer/msk-blanco.png" alt="MSK Logo" className="h-18" />
          <p className="text-[20px] leading-tight max-w-xs md:max-w-none">
            Una propuesta moderna que desafía <br /> a expandir las metas profesionales
          </p>
          <p className="text-xs text-white/70">© 2025 • Medical&Scientific Knowledge S.L.</p>

          {/* Redes sociales */}
          <div className="flex gap-4 mt-2">
            <a href="#"><img src="/icons/facebook.svg" alt="Facebook" className="w-6 h-6" /></a>
            <a href="#"><img src="/icons/instagram.svg" alt="Instagram" className="w-6 h-6" /></a>
            <a href="#"><img src="/icons/youtube.svg" alt="YouTube" className="w-6 h-6" /></a>
            <a href="#"><img src="/icons/linkedin.svg" alt="LinkedIn" className="w-6 h-6" /></a>
          </div>
        </div>

        {/* BLOQUE DERECHO */}
        <div className="w-full md:w-1/2 grid grid-cols-2 gap-x-12 gap-y-2 font-raleway text-base text-[#AEB1B9] mt-30 md:mt-10">
          <div className="space-y-2">
            <a href="#" className="hover:underline block">Contacto</a>
            <a href="#" className="hover:underline block">Bases promocionales</a>
            <a href="#" className="hover:underline block">Política de privacidad</a>
            <a href="#" className="hover:underline block">Política de cookies</a>
            <a href="#" className="hover:underline block">Términos y condiciones</a>
          </div>
          <div className="space-y-2">
            <a href="#" className="hover:underline block">Nuestra misión</a>
            <a href="#" className="hover:underline block">Quiénes somos</a>
            <a href="#" className="hover:underline block">Conviértete en partner</a>
            <a href="#" className="hover:underline block">Centro de ayuda</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
