import { FC } from 'react';
// import errorIcon from "/public/images/icons/error-icon.svg";
import Image from 'next/image';

interface ShowErrorMessageProps {
	text: string;
	visible?: boolean;
}

const ShowErrorMessage: FC<ShowErrorMessageProps> = ({ text, visible }) => {
	return (
		<div className={`flex  items-center mt-4 w-full ${!visible && 'hidden'}`}>
			<Image src={''} width={30} height={30} className='mr-2' alt='error' />
			<span className='font-bold text-center text-red-500' dangerouslySetInnerHTML={{ __html: text }}></span>
		</div>
	);
};

export default ShowErrorMessage;
