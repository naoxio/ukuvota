module.exports = {
	globDirectory: 'dist/client',
	globPatterns: [
		'**/*.{css,js,png,json}'
	],
	swDest: 'dist/client/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};