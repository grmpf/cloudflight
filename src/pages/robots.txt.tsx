//TODO: find a way to do this with getStaticProps()

import {GetServerSidePropsContext} from "next";

const Robots = () => { return null };

export const getServerSideProps = async ({res}: GetServerSidePropsContext) => {
	const baseUrl = process.env.NEXT_PUBLIC_HOST

	//https://www.robotstxt.org/robotstxt.html
	const Robots = `User-agent: *
Disallow:
Sitemap: ${baseUrl}/sitemap.xml`;

	res.setHeader("Content-Type", "text/plain");
	res.write(Robots);
	res.end();

	return {
		props: {},
	};
};

export default Robots;
