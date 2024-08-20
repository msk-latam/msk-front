import ImageSkeleton from './ImageSkeleton'
import TextSkeleton from './TextSkeleton'
import SimpleInputSkeleton from './SimpleInputSkeleton'

const HomeSkeleton = () => {
  return (
    <>
       <section className="container  animate-fade-down">

    <div className={`nc-SectionHero relative pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-20`} data-nc-id="SectionHero">
      <div className="flex flex-col lg:flex-row space-y-14 lg:space-y-0 lg:space-x-10 items-center relative text-center lg:text-left">
       
        <div className="w-screen max-w-full space-y-5 lg:space-y-7 flex-1 flex flex-col items-center lg:items-start">
            <TextSkeleton lines="3" />
            <SimpleInputSkeleton className='mt-8 w-[250px]' />
        </div>
        
            <ImageSkeleton className='w-[700px]' height="180px" />
        
      </div>
    </div>

    <section className='mb-[96px]'>
            <ImageSkeleton className="w-full" height="300px" />
        </section>

        <section className="flex justify-around mb-8 ">
            <ImageSkeleton className="min-w-[400px]" height="150px" />
            <ImageSkeleton className="min-w-[400px] hidden lg:flex" height="150px" />
            <ImageSkeleton className="min-w-[400px] hidden xl:flex" height="150px" />
        </section>
        

        <section className='mb-[96px]'>
            <ImageSkeleton className="w-full mt-8" height="60px" />
        </section>

        <section className='nc-SectionGridCategoryBox relative mb-[96px]'>
            <div className='mt-4 mb-8'>
                <TextSkeleton />
                <TextSkeleton />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 md:gap-8 justify-center w-full">
                <ImageSkeleton className="min-w-[120px]" height="150px" />
                <ImageSkeleton className="min-w-[120px]" height="150px" />
                <ImageSkeleton className="min-w-[120px]" height="150px" />
                <ImageSkeleton className="min-w-[120px]" height="150px" />
                <ImageSkeleton className="min-w-[120px]" height="150px" />
            </div>

            
        </section>

    </section>

    <ImageSkeleton className="w-full mb-[96px]" height="660px" />

    <div className="container  animate-fade-down my-[96px]">
    <div className='mb-[96px]'>
            <div className='w-full mb-12'>
            <TextSkeleton className='w-[300px]' />
            <TextSkeleton className='w-[100px]' />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                <ImageSkeleton className="col-span-2" height="200px" />
                <ImageSkeleton className="col-span-1" height="200px" />
                <ImageSkeleton className="col-span-1" height="200px" />
                <ImageSkeleton className="col-span-1" height="200px" />
                <ImageSkeleton className="col-span-1" height="200px" />
                <ImageSkeleton className="col-span-2" height="200px" />
          </div>
        </div>

        <div className='mb-[96px]'>
            <div className='w-full mb-12'>
            <TextSkeleton className='w-[300px]' />
            <TextSkeleton className='w-[100px]' />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                <ImageSkeleton className="col-span-2" height="200px" />
                <ImageSkeleton className="col-span-1" height="200px" />
                <ImageSkeleton className="col-span-1" height="200px" />
                <ImageSkeleton className="col-span-1" height="200px" />
                <ImageSkeleton className="col-span-1" height="200px" />
                <ImageSkeleton className="col-span-2" height="200px" />
          </div>
        </div>

        <div className="mb-[96px]">
            <div className='w-full mb-12'>
                <TextSkeleton className='w-[300px] mx-auto' />
            </div>

            <div>

            {[1,1,1,1,1,1,1,1].map((item, index) => {
            return (
                <ImageSkeleton key={item} className="mb-2" height="60px" />
            );
          })}
            </div>
        </div>

        
    </div>
        <ImageSkeleton className="w-full mb-[96px]" height="700px" />
    </>
  )
}

export default HomeSkeleton