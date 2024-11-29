import React from 'react';
import BlogHeader from './BlogHeader';
import BlogNavbar from './BlogNavbar';
import BlogArchivo from './BlogArchivo';
import BlogGuiasProfesionales from './BlogGuiasProfesionales';
import BlogVideos from './BlogVideos';
import BlogInfografias from './BlogInfografias';
import BlogCapacitarte from './BlogCapacitarte';
import BlogNewsletter from './BlogNewsletter';

interface BlogPageProps {
	params: { lang: string };
}

const BlogPage: React.FC<BlogPageProps> = ({ params }) => {
	return (
		<>
			<BlogHeader />
			<BlogNavbar />
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
