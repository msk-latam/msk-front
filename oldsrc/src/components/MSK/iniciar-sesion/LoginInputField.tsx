import { ErrorMessage, Field } from 'formik';
import NcImage from '@/components/NcImage/NcImage';
import NcLink from '@/components/NcLink/NcLink';
import { FC } from 'react';
import { usePathname } from 'next/navigation';

interface LoginInputProps {
	label: string;
	name: string;
	type?: string;
	placeholder?: string;
	showPassword?: boolean;
	toggleShowPassword?: () => void;
	isPassword?: boolean;
}

const LoginInput: FC<LoginInputProps> = ({
	label,
	name,
	type = 'text',
	placeholder = '',
	showPassword = false,
	toggleShowPassword,
	isPassword = false,
}) => {
	const pathName = usePathname();
	const match = pathName.match(/^\/([a-z]{2})\b/);
	const country = match ? `${match[1]}` : '';
	return (
		<div className='form-input-std my-4'>
			<label className='flex justify-between items-center text-neutral-800 dark:text-neutral-200'>
				{label}
				{isPassword && (
					<NcLink
						href={country === '' ? `${window.location.origin}/recuperar` : `${window.location.origin}/${country}/recuperar`}
						className='text-sm'
					>
						¿Olvidaste tu contraseña?
					</NcLink>
				)}
			</label>
			<ErrorMessage name={name} component='span' className='error' />
			<div className='relative'>
				{isPassword && toggleShowPassword && (
					<NcImage
						src={showPassword ? '/images/icons/eye-solid.svg' : '/images/icons/eye-slash-solid.svg'}
						className='absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer'
						alt='Toggle show password'
						width='21'
						height='21'
						onClick={toggleShowPassword}
					/>
				)}
				<Field type={isPassword && showPassword ? 'text' : type} name={name} placeholder={placeholder} className='w-full' />
			</div>
		</div>
	);
};

export default LoginInput;
