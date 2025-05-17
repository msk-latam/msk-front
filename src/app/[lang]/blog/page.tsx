import BlogHeader from "@/modules/components/blog/components/BlogHeader";
import Footer from "@/modules/components/footer/footer";
import Navbar from "@/modules/components/navbar/Navbar";
import NewsLetter from "@/modules/components/newsletter/NewsLetter";

type Props = {
  lang: string;
};

export default function Blog({ lang }: Props) {
  return (
    <>
      {/* HEADER CON GRADIENTE COMO EN LOGIN */}
      <div
        className="relative w-full z-9"
        style={{
          background: `linear-gradient(88.79deg, #9200AD -25.91%, #7B8CC3 -0.1%, #700084 31.13%, #B814D6 58.59%, #3B476C 109.69%, #4D005B 177.81%, #9200AD 245.71%),
                       linear-gradient(360deg, rgba(0, 0, 0, 0) -76.85%, rgba(0, 0, 0, 0.2) 113.39%)`,
        }}
      >
        <Navbar />
        <BlogHeader lang={lang} />
      </div>
      <main className="bg-gray-50 z-[9]">
        <div className="flex flex-col-reverse lg:flex-row gap-6 md:py-12 pt-12 overflow-visible max-w-[1600px] md:px-4 mx-auto ">
          <div className="w-full bg-white rounded-[38px] flex flex-col relative z-[9] md:-mt-24 px-5 pt-9 h-full my-auto pb-10 md:px-9 mb-20 gap-6 md:gap-0 overflow-visible max-w-[1600px] mx-auto">
<div className='flex flex-col items-center justify-center px-4 py-10 text-center col-span-full'>
							<svg
								className='w-16 h-16 mb-4 text-gray-400'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
							<p className='text-lg font-medium text-gray-700'>Estamos trabajando para usted</p>
							<p className='mt-2 text-sm text-gray-500'>Vuelva más tarde</p>
						</div>




          </div>
        </div>
      </main>
      <NewsLetter />
      <Footer />
    </>
  );
}
