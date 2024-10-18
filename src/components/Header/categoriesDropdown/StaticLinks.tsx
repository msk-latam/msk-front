import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ofrecemosIcon from '@/public/webp-images/icons/ofrecemosIcon.svg';
import recursosIcon from '@/public/webp-images/icons/recursosIcon.svg';

const StaticLinks = ({ onClickClose }: { onClickClose: () => void }) => (
	<>
		<div>
			<Image src={ofrecemosIcon} alt='Ofrecemos' width={20} height={20} />
			<h2>Qué ofrecemos</h2>
			<ul>
				<li>
					<Link href={'/tienda/?profesion=medicos&recurso=curso'} onClick={onClickClose}>
						Cursos para personal médico
					</Link>
				</li>
				<li>
					<Link href={'/tienda/?profesion=otra-profesion'} onClick={onClickClose}>
						Cursos para enfermería
					</Link>
				</li>
			</ul>
		</div>
		<div>
			<Image src={recursosIcon} alt='Recursos' width={20} height={20} />
			<h2>Recursos</h2>
			<ul>
				<li>
					<Link href={'/tienda/?recurso=guias-profesionales'} onClick={onClickClose}>
						Guías Profesionales
					</Link>
				</li>
				<li>
					<Link href={'/blog'} onClick={onClickClose}>
						Blog
					</Link>
				</li>
			</ul>
		</div>
	</>
);

export default StaticLinks;
