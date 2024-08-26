import SingleHeader from '../MSK/Privacy/SingleHeader';

const InfoPageHeader = ({ pageData }: any) => {
  return (
    <header className='relative pt-16 z-10 md:py-20 lg:py-14 md:w-[141.5%] left-1/2 transform -translate-x-1/2 w-screen'>
      <div className='dark relative z-10 ml-0 sm:ml-6 md:ml-12 lg:ml-24 max-w-screen-lg'>
        <div className='max-w-screen-md container'>
          <SingleHeader
            hiddenDesc
            metaActionStyle='style2'
            pageData={pageData}
          />
        </div>
      </div>

      <div className=''>
        <img
          className='absolute top-0 left-1/2 transform -translate-x-1/2 w-screen md:w-[98.7vw] h-full object-cover'
          style={{ maxWidth: '100vw' }}
          src='/images/misc/quienes-somos.jpg'
          alt=''
        />
      </div>
    </header>
  );
};

export default InfoPageHeader;
