import React, { useRef, useState } from 'react';
import { RiUploadCloud2Line } from "react-icons/ri";
import { FiTrash2 } from "react-icons/fi";

interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    id: string;
    label: string;
    containerClassName?: string;
    error?: string;
}

const FileInput: React.FC<FileInputProps> = ({
    id,
    label,
    error,
    className = '',
    containerClassName = '',
    onChange,
    ...props
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFileName(file ? file.name : null);
        onChange?.(e); // Keep external onChange if provided
    };

    const handleClearFile = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
            setFileName(null);
            // Trigger onChange with empty event
            const event = new Event('change', { bubbles: true });
            inputRef.current.dispatchEvent(event);
        }
    };

    return (
        <div className={`w-full ${containerClassName}`}>
            <label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1.5'>
                {label}
            </label>
            <div className="relative flex items-center border rounded-[16px] px-4 py-3 gap-3 bg-white focus-within:ring-1 focus-within:ring-[#9200AD] focus-within:border-[#9200AD] border-gray-300">
                <input
                    ref={inputRef}
                    type="file"
                    id={id}
                    className="hidden"
                    onChange={handleFileChange}
                    {...props}
                />
                <label htmlFor={id} className="cursor-pointer text-sm text-black flex-1 truncate">
                    {fileName || 'Seleccionar archivo...'}
                </label>
                {fileName && (
                    <button
                    type="button"
                    onClick={handleClearFile}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Borrar archivo"
                    >
                        <FiTrash2 className="h-5 w-5" />
                    </button>
                )}
                <RiUploadCloud2Line className="h-5 w-5 text-black" />
            </div>
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
};

export default FileInput;
