const withTM = require('next-transpile-modules')([
	'three',
], {
	//debug: true,
	//resolveSymlinks: false
})

let withBundleAnalyzer = {}
if (process.env.NODE_ENV === 'development') { //required when installed as devDependency
  withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })
}



const withPlugins = require('next-compose-plugins')
module.exports = withPlugins([
		withBundleAnalyzer,
		withTM, // wants to be the last plugin in this list
	],
	{
		poweredByHeader: false,
		reactStrictMode: true,

		//to ignore TS errors during build (for now)
		typescript: {ignoreBuildErrors: true},
		images: {
			domains: [
				'images.unsplash.com',
				'github.com',
			],
		},

		/* defaults you might want to overwrite
		reactStrictMode: false, // in dev mode only - https://nextjs.org/docs/api-reference/next.config.js/react-strict-mod
		poweredByHeader: true, // false => to disable the x-powered-by
		generateEtags: true, // false => to disable ETag generation
		images: {
		  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		},
		*/

		i18n: {
			locales: [
				//'de',
				'en',
			],
			defaultLocale: 'en',
			//localeDetection: false
		},

		//experimental: {
		//  outputStandalone: true, // https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files-experimental
		//},


		async headers() {
			const h = [
				{
					source: '/((?!api$|api/).*)',
					headers: [
						{
							key: 'X-Clacks-Overhead',
							value: 'GNU Terry Pratchett',
						}
					]
				},
			]

			if (process.env.NODE_ENV === 'production') {
				const securityHeaders = require('./src/core/securityHeaders.js');
				//console.log('securityHeaders', securityHeaders)
				if (securityHeaders.length > 0) {
					h.push(
						{ // https://nextjs.org/docs/advanced-features/security-headers#content-security-policy
							// Apply these headers to all routes in your application.
							source: '/:path*', // all incl. top-lvl
							headers: securityHeaders,
						}
					)
				}
			}

			return h
		},

	}
)
