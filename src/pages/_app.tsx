import NHead from 'next/head'
import '../styles/global.scss'
import '../styles/typography.scss'
import {defaultTitle, defaultTitleShort, defaultDesc, twitterUser} from "../next-seo.config";

//import { DefaultSeo, LogoJsonLd } from 'next-seo'
//import DefaultSeoProps from '../next-seo.config';

const Header = () => {
	return (
		<>
			<NHead>
				{/* ******* GENERAL ******* */}
				<meta charSet="utf-8" />{/* must be "charSet" (not "charset") or next(?) will inject "charSet" as well */}
				{/* <= IE10 <meta httpEquiv="X-UA-Compatible" content="IE=edge" />*/}
				<meta // full width (no-resize, no-gap4notch-safari)
					name="viewport"
					content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover" // testing: maximum-scale=1,user-scalable=no
				/>
				<title>{defaultTitle}</title>

				<link rel="icon" sizes="any" href="/favicon.ico" />{/* type="image/x-icon" */}
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />

				{/* <link rel="manifest" href="/manifest.json"/> */}
				<link rel="manifest" href="/manifest.webmanifest"/>
				<meta name="theme-color" content="#1d508f" />
				{/* <meta name="msapplication-config" content="/browserconfig.xml" /> */}

				<link rel="alternate icon" sizes="32x32" type="image/png" href="/favicon-32x32.png" />
				<link rel="alternate icon" sizes="16x16" type="image/png" href="/favicon-16x16.png" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				{/* not for now... caching is way to aggressive
				<link rel="mask-icon" color="#5299d1" href="/safari-pinned-tab.svg"/>
				*/}
				<meta name="msapplication-TileColor" content="#5299d1" />

				{/* OLDER STUFF
				<meta name="apple-mobile-web-app-title" content={defaultTitleShort} />
				<meta name="application-name" content={defaultTitleShort} />
				*/}

				{/* TODO: move to DefaultSeo */}
				<meta name='og:title' content={defaultTitle} />
				<meta name='og:type' content='website' />
				<meta name='og:url' content={`${process.env.NEXT_PUBLIC_HOST}/`} />
				<meta name='og:image' content={`${process.env.NEXT_PUBLIC_HOST}/assets/img/share.jpg`} />
				<meta name='og:site_name' content={defaultTitle} />
				<meta name='og:description' content={defaultDesc} />

				<meta name="twitter:card" content="summary_large_image"/>
				<meta name="twitter:site" content={`@${twitterUser}`}/>
				{/* ???
				<meta name="twitter:creator" content={`@${twitterUser}`}/>
				*/}

				{/* OPTIONAL: twitter shows a ratio of 2:1 but would also work with the default og:image (but crops) */}
				{/*
				<meta name="twitter:image" content={'/assets/img/shareXY-twit2.jpg'} />
				<meta name="twitter:image:width" content="1500" />
				<meta name="twitter:image:height" content="750" />
				<meta name="twitter:image:alt" content={}/>
				*/}
			</NHead>

			{/* TODO: JsonLd
			<DefaultSeo {...DefaultSeoProps} />
			<LogoJsonLd
				logo={`${process.env.NEXT_PUBLIC_HOST}/assets/img/logo.png`}
				url={`${process.env.NEXT_PUBLIC_HOST}`}
			/>
			*/}
		</>
	)
}

const App = ({ Component, pageProps }) => {
	return (
		<>
			<Header />

			<Component {...pageProps} />
		</>
	)
}

export default App
