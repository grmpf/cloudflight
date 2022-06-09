/**
NOTES
- IMPORTANT: Content-Type should be "application/manifest+json" (or at least a JSON MIME type), no matter if "manifest.json", "manifest.webmanifest" or "/api/getManifest" is used.
- Icon "purpose" defaults to "any" (options: monochrome, maskable, any). If an icon contains multiple purposes, it could be used for any of those purposes (works like an OR condition).
  So you can add additional icons for "maskable", "monochrome" and "maskable monochrome" (unclear where monochrome will be used though).
  "any maskable" should be unlikely.
- Because it's not static (yet), this could be an api route instead (with rewrite via next.config.js).

TODO: find a way to do make this static
TODO: fix issues with icons on android.
TODO: update after some more icon research
*/


import {GetServerSidePropsContext} from "next";
import {defaultTitle, defaultTitleShort, defaultTitleExtraShort, defaultDesc} from "../next-seo.config";


const icons = [
	{ // TODO: only 48x48 32x32 16x16?
		"src": "favicon.ico",
		"sizes": "64x64 48x48 32x32 24x24 16x16",
		"type": "image/x-icon",
		"purpose": "any"
	},

	//{
	//	"src": "assets/img/icons/icon-72x72.png",
	//	"sizes": "72x72",
	//	"type": "image/png",
	//	"purpose": "any"
	//},
	//{ // avoid?
	//	"src": "assets/img/icons/icon-96x96.png",
	//	"sizes": "96x96",
	//	"type": "image/png",
	//	"purpose": "any"
	//},
	//{
	//	"src": "assets/img/icons/icon-128x128.png",
	//	"sizes": "128x128",
	//	"type": "image/png",
	//	"purpose": "any"
	//},
	//{
	//	"src": "assets/img/icons/icon-144x144.png",
	//	"sizes": "144x144",
	//	"type": "image/png",
	//	"purpose": "any"
	//},
	//{
	//	"src": "assets/img/icons/icon-152x152.png",
	//	"sizes": "152x152",
	//	"type": "image/png",
	//	"purpose": "any"
	//},
	{
		"src": "assets/icon/android-chrome-192x192.png",
		"sizes": "192x192",
		"type": "image/png",
		"purpose": "any"
	},
	//{
	//	"src": "assets/img/icons/icon-384x384.png",
	//	"sizes": "384x384",
	//	"type": "image/png",
	//	"purpose": "any"
	//},
	{
		"src": "assets/icon/android-chrome-512x512.png",
		"sizes": "512x512",
		"type": "image/png",
		"purpose": "any"
	},

	// MASKABLE PNG: fallback if SVG does not work
	{
		"src": "assets/icon/maskable-inverted-192x192.png",
		"sizes": "192x192",
		"type": "image/png",
		"purpose": "maskable"
	},
	{
		"src": "assets/icon/maskable-inverted-512x512.png",
		"sizes": "512x512",
		"type": "image/png",
		"purpose": "maskable"
	},

	// SVG: THE best option
	// - With size overwrites to help browsers choose the right size
	// - And the biggest size +1 to make this the go-to image when even bigger image are requested.
	{
		"src": "favicon.svg",
		"sizes": "513x513 512x512 192x192 180x180 150x150 144x144 120x120 72x72 64x64 48x48 32x32 26x26 24x24 22x22 16x16",
		"type": "image/svg+xml",
		"purpose": "any monochrome"
	},

	// MASKABLE SVG
	{
		"src": "assets/icon/favicon-maskable-inverted.svg",
		//"src": "assets/icon/favicon-maskable-inverted-test.svg",
		//"src": "assets/icon/favicon-maskable-test.svg",
		"sizes": "513x513 512x512 192x192 180x180 150x150 144x144 120x120 72x72 64x64 48x48 32x32 26x26 24x24 22x22 16x16",
		"type": "image/svg+xml",
		"purpose": "maskable"
	},

	// MONOCHROME SVG: because why not - it's easy with an svg
	/* Actually: this SHOULD already work with default favicon.svg (when all colors are ignored the result has to be black and transparent)
	{
		"src": "assets/icon/favicon-mono.svg",
		"sizes": "513x513 512x512 192x192 150x150 144x144 72x72 64x64 48x48 32x32 24x24 16x16",
		"type": "image/svg+xml",
		"purpose": "monochrome"
	},
	*/
]

const screenshots = [
	{
		"src": "assets/screenshots/screenshot-1.jpg",
		"type": "image/jpeg",
		"sizes": "1920x1080",
		"label": "Example with text: LOREM IPSUM"
	},
	{
		"src": "assets/screenshots/screenshot-2.jpg",
		"type": "image/jpeg",
		"sizes": "1920x1080",
		"label": "Example with clock: 10:42"
	},
	{
		"src": "assets/screenshots/screenshot-3.jpg",
		"type": "image/jpeg",
		"sizes": "1920x1080",
		"label": "Example with text: DON'T ... THE INTERNET"
	},
	{
		"src": "assets/screenshots/screenshot-4.jpg",
		"type": "image/jpeg",
		"sizes": "1920x1080",
		"label": "Example with text: DON'T PANIC"
	}
]

// TODO: make this dynamic (and make sure to use the same title, desc etc. everywhere)
const shortcuts = [
	{
		"name": "Clock (HH:MM)",
		"short_name": "Clock",
		"description": "Current time without seconds",
		"url": "/?source=pwa&embed=1&type=clock&size=40&ls=8&color=ff9b06"
	},
	{
		"name": "Clock (HH:MM:SS)",
		"short_name": "Clock (+sec)",
		"description": "Current time with seconds",
		"url": "/?source=pwa&embed=1&type=clock&size=40&ls=8&color=ff9b06&sec=1"
	},
	{
		"name": "Only Clouds",
		"short_name": "Clouds",
		//"description": "Test Desc 3",
		"url": "/?source=pwa&embed=1&type=text&text="
	},
	{
		"name": "Demo 1",
		"short_name": "Demo 1",
		"description": "Test Desc 4",
		"url": "/?source=pwa&embed=1&type=text&size=22&ls=-14&color=ff9b06&lh=0.9&text=D%20%20O%20%20N%20%20%27%20%20%20T%20%20%20%20%20%20IIIIIIIIIIIIIIIIIIIIIII~T%20%20H%20%20E%20%20%20%20%20%20I%20%20N%20%20T%20%20E%20%20R%20%20N%20%20E%20%20T",
		"icons": [
			{
				"src": "favicon.svg",
				"type": "image/svg+xml"
			}
		]
	},
	{
		"name": "Config",
		"short_name": "Config",
		"description": "Test Desc 5",
		"url": "/?source=pwa&embed=0",
		"icons": [
			{
				"src": "/assets/icon/android-chrome-192x192.png",
				"type": "image/png",
				"sizes": "192x192"
			}
		]
	}
]


const manifestJson = {
	"name": defaultTitle,
	"short_name": defaultTitleShort,
	"description": defaultDesc,
	"categories": [ // https://w3c.github.io/manifest-app-info/#categories-member
		"graphics & design",
		"graphics",
		"design",
		"entertainment",
		"lifestyle",
		//"multimedia",
		//"multimedia design",
		"personalization",
	],
	"scope": "/",
	"start_url": "/?source=pwa",
	"display_override": ["window-controls-overlay"], // for testing
	//"display": "standalone",
	"display": "minimal-ui",
	"orientation": "any",
	//"theme_color": "#ffffff",
	"theme_color": "#1d508f",
	//"background_color": "#1d508f",
	"background_color": "#ffffff",

	"icons": icons,
	"screenshots": screenshots,
	"shortcuts": shortcuts
	//"splash_pages": null
}


const Manifest = () => { return null };

export const getServerSideProps = async ({res}: GetServerSidePropsContext) => {
	res.setHeader("Content-Type", "application/manifest+json; charset=utf-8");
	//res.write(JSON.stringify(manifestJson);
	res.write(JSON.stringify(manifestJson, null, 2)); // pretty-print
	res.end();

	return {
		props: {},
	};
};

export default Manifest;
