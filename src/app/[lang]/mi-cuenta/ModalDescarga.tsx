import React from 'react';

interface ModalDescargaProps {
  onClose: () => void;
}

const ModalDescarga: React.FC<ModalDescargaProps> = ({ onClose }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div
        className='absolute inset-0 bg-black opacity-50 backdrop-blur-sm'
        onClick={onClose}
      ></div>
      <div className='bg-white p-6 rounded-lg shadow-lg z-10'>
        <p className='text-center text-gray-800'>hola</p>
        <button
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalDescarga;
