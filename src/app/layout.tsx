
import { Raleway, Inter, Lora } from 'next/font/google';

const loraItalic = Lora({
  subsets: ['latin'],
  style: 'italic',
  variable: '--font-lora-italic',
  weight: ['400', '500', '600', '700'],
});

const lora = Lora({
  subsets: ['latin'],
  style: 'normal',
  variable: '--font-lora-italic',
  weight: ['400', '500', '600', '700'],
});
const raleway = Raleway({
  subsets: ['latin'],
  style: 'normal',
  variable: '--font-lora-italic',
  weight: ['400', '500', '600', '700'],
});

const ralewayItalic = Raleway({
  subsets: ['latin'],
  style: 'italic',
  variable: '--font-lora-italic',
  weight: ['400', '500', '600', '700'],

});

const interItalic = Inter({
  subsets: ['latin'],
  style: 'italic',
  variable: '--font-lora-italic',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  style: 'normal',
  variable: '--font-lora-italic',
  weight: ['400', '500', '600', '700'],
});


export const metadata = {
	title: 'MSK',
	description: 'Cursos de medicina para toda latinoamerica',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	);
}
