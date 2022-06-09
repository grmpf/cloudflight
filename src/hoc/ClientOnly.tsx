import { useEffect, useState } from 'react'

function ClientOnly({ children }) {
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		//console.log('ClientOnly has mounted!')
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}
	return (
		<>
			{children}
		</>
	);
}
export { ClientOnly, ClientOnly as AfterMount }
