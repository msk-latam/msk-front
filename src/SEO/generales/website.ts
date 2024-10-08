const websiteDataSEO = {
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	url: 'https://msklatam.com',
	potentialAction: {
		'@type': 'SearchAction',
		target: 'https://msklatam.com/search?q={search_term_string}',
		'query-input': 'required name=search_term_string',
	},
};

export default websiteDataSEO;
