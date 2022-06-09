import { useEffect, useState } from 'react'

export default function useMounted() {
	const [mounted, setMounted] = useState(false)
	useEffect(() => {
		if (!mounted) {
			setMounted(true)
		}
	}, [])

	return mounted
}
