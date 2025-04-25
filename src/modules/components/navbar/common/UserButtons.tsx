'use client';

import Link from 'next/link';
import { FiUser,FiBell } from "react-icons/fi";

const UserButtons = () => {
return (
    <div className="flex items-center gap-3">      
    <Link href="/login">
        <button
          className={`text-sm font-medium whitespace-nowrap rounded-[38px] px-6 py-3 transition-colors duration-300 text-gray-800 border border-gray-500 hover:bg-gray-300`}
        >
          Cerrar sesión
        </button>
      </Link>
      <Link href="/login?form=registerForm">
        <button className="px-4 py-3.5">
        <FiUser className='scale-125'/>
        </button>
      </Link>
        <button className="bg-[#DBDDE2] rounded-full p-4">
        <FiBell className='scale-125' />
        </button>
    </div>
  );
};

export default UserButtons;
