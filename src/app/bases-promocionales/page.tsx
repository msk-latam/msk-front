import React, { FC } from 'react';
import PageBasesPromocionalesComponent from '@/components/MSK/bases-promocionales/Page';
import { generateBasesPromocionalesMetadata } from '@/SEO/bases-promocionales/metaData/basesPromocionalesMetaData';

export async function generateMetadata({ params }: { params: { lang: string } }) {
	return await generateBasesPromocionalesMetadata({ params });
}

const PageContractConditions: FC = () => {
	return <PageBasesPromocionalesComponent />;
};

export default PageContractConditions;
