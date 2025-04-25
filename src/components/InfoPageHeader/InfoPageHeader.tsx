import SingleHeader from '../MSK/Privacy/SingleHeader';

const InfoPageHeader = ({ pageData }: any) => {
	console.log(pageData);
	return (
		<header className='relative z-10 w-screen pt-16 transform -translate-x-1/2 md:py-20 lg:py-14 left-1/2'>
			<div className='relative z-10 dark md:ml-1 '>
				<div className='container '>
					<SingleHeader hiddenDesc metaActionStyle='style2' pageData={pageData} />
				</div>
			</div>

			<div className=''>
				<img
					className='absolute top-0 object-cover w-screen h-full transform -translate-x-1/2 left-1/2'
					style={{ maxWidth: '100vw' }}
					src={pageData.featuredImage ? pageData.featuredImage : `/images/misc/quienes-somos.jpg`}
					alt=''
				/>
			</div>
		</header>
	);
};

export default InfoPageHeader;
