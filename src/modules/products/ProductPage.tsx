// // app/tienda/course/[slug]/page.tsx
// "use client";

// import { useParams } from "next/navigation";
// import Navbar from "@/modules/components/navbar/Navbar";
// import Footer from "@/modules/components/footer/footer";
// import CourseHeader from "./components/CourseHeader";
// import CourseSummary from "./components/CourseSummary";
// import CourseDescription from "./components/CourseDescription";
// import CourseLearning from "./components/CourseLearning";
// import CourseTeachers from "./components/CourseTeachers";
// import CourseCertificate from "./components/CourseCertificate";
// import CourseSyllabus from "./components/CourseSyllabus";
// import CourseSupportForm from "./components/CourseSupportForm";
// import CourseTestimonials from "./components/CourseTestimonials";
// import CourseInstitutions from "./components/CourseInstitutions";
// import CourseOverview from "./components/CourseOverview";
// import CourseVideo from "./components/CourseVideo";
// import CourseCards from "./components/CourseCards";
// import Inscription from "./components/Inscription";

// export default function CoursePage() {
//   // Obtener el parámetro `slug` usando useParams
// //   const { slug } = useParams();
//   // Asegurarse de que `slug` esté disponible antes de renderizar el componente
//   // if (!slug) {
//   //   return <div>Loading...</div>;
//   // }
//   const slug = 'iniciacion-investigacion-enfermeria'

//   return (
//     <>
//       {/* HEADER CON GRADIENTE COMO EN LOGIN */}
//       <div
//         className="relative w-full z-9"
//         style={{
//           background: `linear-gradient(88.79deg, #9200AD -25.91%, #7B8CC3 -0.1%, #700084 31.13%, #B814D6 58.59%, #3B476C 109.69%, #4D005B 177.81%, #9200AD 245.71%),
//                        linear-gradient(360deg, rgba(0, 0, 0, 0) -76.85%, rgba(0, 0, 0, 0.2) 113.39%)`,
//         }}
//       >
//         <Navbar />
//         <CourseHeader slug={slug} />
//       </div>

//       {/* CONTENIDO PRINCIPAL */}
//       <main className="bg-gray-50 z-[9]">
//         <div className="flex flex-col-reverse lg:flex-row gap-6 md:py-12 pt-12 overflow-visible max-w-[1600px] md:px-4 mx-auto">
//           {/* Columna izquierda */}
//           <div className="w-full md:w-2/3 space-y-6 z-[9]">
//             <div className="w-full bg-white rounded-[38px] flex flex-col relative z-[9] md:-mt-20 px-5 pt-9 pb-3 md:px-9 gap-6 md:gap-0">
//               <CourseDescription  slug={slug}/>
//               <CourseInstitutions slug={slug} />
//               <CourseLearning slug={slug}/>
//               <CourseOverview slug={slug} />
//               <CourseTeachers slug={slug} />
//             </div>
//             {/* Nuevo contenedor para video */}
//             <div className="">
//               <CourseVideo slug={slug}/>
//             </div>
//             {/* Nuevo contenedor para Certificate */}
//             <div className="">
//               <CourseCertificate slug={slug}/>
//             </div>
//             {/* Nuevo contenedor para CourseSyllabus */}
//             <div className="w-full  bg-white rounded-[38px] md:py-16 md:px-9 px-6 py-9">
//               <CourseSyllabus slug={slug}/>
//             </div>
//             {/* Nuevo contenedor para Cards */}
//             <div className="w-full">
//               <CourseCards />
//             </div>
//             {/* Nuevo contenedor para CourseSupportForm */}
//             <div className="w-full bg-white rounded-[38px] md:py-16 md:px-9 px-6 py-9 z-[9]">
//               <CourseSupportForm />
//             </div>
//           </div>

//           {/* Columna derecha */}
//           <aside className="w-full md:w-1/3 relative z-[9] -mt-20">
//             <CourseSummary />
//           </aside>
//         </div>

//         {/* Testimonios */}
//         <div className="w-full z-[5]">
//           <CourseTestimonials />
//         </div>
//         <Inscription />
//       </main>

//       <Footer />
//     </>
//   );
// }

// app/tienda/course/[slug]/page.tsx
'use client';

import { useState } from 'react';
import Footer from '@/modules/components/footer/footer';
import Navbar from '@/modules/components/navbar/Navbar';
import { useParams } from 'next/navigation';
import CourseCards from './components/CourseCards';
import CourseCertificate from './components/CourseCertificate';
import CourseDescription from './components/CourseDescription';
import CourseHeader from './components/CourseHeader';
import CourseInstitutions from './components/CourseInstitutions/CourseInstitutions';
import CourseLearning from './components/CourseLearning';
import CourseOverview from './components/CourseOverview/CourseOverview';
import CourseSummary from './components/CourseSummary';
import CourseSummaryDownload from './components/CourseSummaryDownload';
import CourseSupportForm from './components/CourseSupportForm';
import CourseSyllabus from './components/CourseSyllabus';
import CourseTeachers from './components/CourseTeachers';
import CourseTestimonials from './components/CourseTestimonials';
import CourseVideo from './components/CourseVideo';
import Inscription from './components/Inscription';
import { useProductPage } from './hooks/useProductPage';
import SkeletonCourseHeader from './skeletons/SkeletonCourseHeader';

interface ProductPageComponentProps {
	course: any; // idealmente tipalo bien, pero `any` funciona por ahora
	lang: string;
}

export default function ProductPageComponent({ course, lang }: ProductPageComponentProps) {
	{
		const params = useParams();
		const slug = params?.slug as string;

		if (!slug) {
			return <div>Loading...</div>;
		}
		const [visibleSections, setVisibleSections] = useState({
			description: true,
			institutions: true,
			learning: true,
			overview: true,
			teachers: true,
		});
		const allSectionsHidden = Object.values(visibleSections).every((v) => v === false);
		const { data: metadata, loading: metaLoading } = useProductPage(slug, lang);

		if (metaLoading) return <SkeletonCourseHeader />;

		const isDownloadable = metadata?.resource === 'downloadable';

		return (
			<>
				{/* HEADER CON GRADIENTE COMO EN LOGIN */}
				<div
					className='relative w-full z-9'
					style={{
						background: `linear-gradient(88.79deg, #9200AD -25.91%, #7B8CC3 -0.1%, #700084 31.13%, #B814D6 58.59%, #3B476C 109.69%, #4D005B 177.81%, #9200AD 245.71%),
                       linear-gradient(360deg, rgba(0, 0, 0, 0) -76.85%, rgba(0, 0, 0, 0.2) 113.39%)`,
					}}
				>
					<Navbar />
					<CourseHeader slug={slug} lang={lang} />
				</div>

				{/* CONTENIDO PRINCIPAL */}
				<main className='bg-gray-50 z-[9]'>
					<div className='flex flex-col-reverse lg:flex-row gap-6 md:py-12 pt-12 overflow-visible max-w-[1600px] md:px-4 mx-auto'>
						{/* Columna izquierda */}
						<div className='w-full md:w-2/3 space-y-6 z-[9]'>
							<div
								className={`w-full bg-white rounded-[38px] flex flex-col relative z-[9] md:-mt-20 px-5 pt-9 pb-3 md:px-9 gap-6 md:gap-0 ${
									allSectionsHidden ? 'hidden' : ''
								}`}
							>
								<CourseDescription
									slug={slug}
									lang={lang}
									onHideEmpty={() =>
										setVisibleSections((prev) => ({
											...prev,
											description: false,
										}))
									}
								/>

								<CourseInstitutions
									slug={slug}
									lang={lang}
									onHideEmpty={() =>
										setVisibleSections((prev) => ({
											...prev,
											institutions: false,
										}))
									}
								/>

								<CourseLearning
									slug={slug}
									lang={lang}
									onHideEmpty={() => setVisibleSections((prev) => ({ ...prev, learning: false }))}
								/>

								<CourseOverview
									isDownloadable={isDownloadable}
									slug={slug}
									lang={lang}
									onHideEmpty={() => setVisibleSections((prev) => ({ ...prev, overview: false }))}
								/>

								<CourseTeachers
									slug={slug}
									lang={lang}
									onHideEmpty={() => setVisibleSections((prev) => ({ ...prev, teachers: false }))}
								/>
							</div>
							<div className=''>{!isDownloadable && <CourseVideo slug={slug} lang={lang} />}</div>
							<div className=''>{!isDownloadable && <CourseCertificate slug={slug} lang={lang} />}</div>
							<div className=''>{!isDownloadable && <CourseSyllabus slug={slug} lang={lang} />}</div>
							<div className='w-full'>{!isDownloadable && <CourseCards />}</div>
							<div className=''>{!isDownloadable && <CourseSupportForm slug={slug} lang={lang} />}</div>
						</div>

						{/* Columna derecha */}
						<aside className='w-full md:w-1/3 relative z-[8] -mt-20'>
							{!isDownloadable && <CourseSummary slug={slug} lang={lang} />}
							{isDownloadable && <CourseSummaryDownload slug={slug} lang={lang} />}
						</aside>
					</div>

					{/* Testimonios */}
					<div className='w-full z-[5]'>
						<CourseTestimonials slug={slug} lang={lang} />
					</div>
					<Inscription slug={slug} lang={lang} />
				</main>

				<Footer />
			</>
		);
	}
}
