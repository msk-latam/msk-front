'use client';

export default function NavbarSkeleton() {
  return (
    <div className="hidden md:flex md:flex-row items-center pt-2 mt-6 animate-pulse">
      <div className="flex items-top w-full max-w-[1300px] mx-auto pl-14 pr-28 z-50 relative">
        {/* Logo */}
        <div className="w-[90px] h-[90px] bg-gray-300 rounded-full"></div>

        {/* Navegación */}
        <div className="w-full">
          <nav className="flex items-center flex-grow justify-between py-1.5 px-4 ml-28 bg-white shadow-md rounded-full">
            <div className="flex items-center gap-6 px-4">
              <div className="h-6 w-24 bg-gray-300 rounded"></div>
            </div>

            <div className="flex-grow max-w-md mx-4">
              <div className="h-10 bg-gray-300 rounded-full"></div>
            </div>

            <div className="flex gap-4">
              <div className="h-10 w-24 bg-gray-300 rounded-full"></div>
              <div className="h-10 w-24 bg-gray-300 rounded-full"></div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
