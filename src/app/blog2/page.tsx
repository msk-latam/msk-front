import React from 'react';
import BlogHeader from './BlogHeader';
import BlogNavbar from './BlogNavbar';
import BlogArchivo from './BlogArchivo';
import BlogGuiasProfesionales from './BlogGuiasProfesionales';
import BlogVideos from './BlogVideos';
import BlogInfografias from './BlogInfografias';
import BlogCapacitarte from './BlogCapacitarte';
import BlogNewsletter from './BlogNewsletter';
import TypeformEmbed from './TypeformEmbed';

interface BlogPageProps {
	params: { lang: string };
}

const BlogPage: React.FC<BlogPageProps> = ({ params }) => {
	return (
		<>
			<BlogHeader />
			<div className='hidden lg:block'>
				<BlogNavbar />
			</div>
			<BlogArchivo />
			<BlogGuiasProfesionales params={params} />
			<BlogVideos />
			<BlogInfografias />
			<BlogCapacitarte params={params} />
			<BlogNewsletter />

			{/* hecho por Ariel Eitner  */}
		</>
	);
};

export default BlogPage;
