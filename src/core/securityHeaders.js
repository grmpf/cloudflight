// to be used in next.config.js

function securityHeaders() {
	let securityHeaders = []
	//if (process.env.NODE_ENV === 'production') {
		securityHeaders = [
			{ // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP || https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy

				// child-src example.com;
				// style-src 'self' example.com;
				// frame-ancestors 'self' => similar to X-Frame-Options but for newer browsers


				key: 'Content-Security-Policy',
				//value: `
				//default-src 'self';
				//script-src 'self';
				//style-src 'self';
				//font-src 'self';
				//frame-ancestors 'self';
				//frame-src 'self';

				// to make it work with Three/R3F and draco (download?) and GoogleFont (download?)
				value: `
				default-src 'self';
				font-src 'self';
				frame-ancestors 'self';
				frame-src 'self';

				script-src 'self' 'unsafe-eval' blob:;
				style-src 'self' 'unsafe-inline';
				img-src 'self' data:;
				connect-src 'self' data: https://www.gstatic.com https://fonts.gstatic.com;
				script-src-elem 'self' blob:;
				worker-src 'self' blob:;

				child-src 'self' blob:;

			`.replace(/\s{2,}/g, ' ').trim(),
			}
			,{ // similar to "script-src 'self'" but for older browsers - iframes should be handled as well to prevent vulnerability to side-channel attacks
				key: 'X-XSS-Protection',
				value: '1; mode=block'
			}
			,{// similar to "frame-ancestors 'self'" but for older browsers
				key: 'X-Frame-Options',
				value: 'SAMEORIGIN'
			}
			,{
				key: 'X-Content-Type-Options',
				value: 'nosniff'
			}
			//,{ // should be default behaviour
			//  key: 'X-DNS-Prefetch-Control',
			//  value: 'on'
			//}
			//,{
			//  key: 'Permissions-Policy',
			//  //value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
			//  value: `
			//		  accelerometer=(),
			//		  ambient-light-sensor=(),
			//		  autoplay=(),
			//		  battery=(),
			//		  camera=(),
			//		  display-capture=(),
			//		  document-domain=(),
			//		  encrypted-media=(),
			//		  fullscreen=(),
			//		  gamepad=(),
			//		  geolocation=(),
			//		  gyroscope=(),
			//		  layout-animations=(),
			//		  legacy-image-formats=(),
			//		  magnetometer=(),
			//		  microphone=(),
			//		  midi=(),
			//		  oversized-images=(),
			//		  payment=(),
			//		  picture-in-picture=(),
			//		  publickey-credentials-get=(),
			//		  speaker-selection=(),
			//		  sync-xhr=(),
			//		  usb=(),
			//		  screen-wake-lock=(),
			//		  web-share=(),
			//		  xr-spatial-tracking=()
			//		`.replace(/\s{2,}/g, ' ').trim()
			//}
			//,{ // https://scotthelme.co.uk/a-new-security-header-referrer-policy/
			//	key: 'Referrer-Policy',
			//	//value: 'origin-when-cross-origin'
			//	value: 'no-referrer-when-downgrade'
			//}
		]

		if (process.env.NEXT_PUBLIC_HOST.indexOf('https') === 0) {
			securityHeaders.push({ // prefer HTTPS (incl. subdomains with max-age of 2 years)
				key: 'Strict-Transport-Security',
				value: 'max-age=63072001; includeSubDomains; preload',
			})
		}
	//}
	return securityHeaders;
}

module.exports = securityHeaders();
