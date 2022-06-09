import { useEffect, useRef } from 'react'

export default function useInterval(callback, delay) {
	const savedCallback = useRef()

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	// Set up the interval.
	useEffect(() => {
		function tick() {
			//console.count('tock')
			if(savedCallback?.current) {
				savedCallback.current()
			}
		}
		if(savedCallback?.current) {
			if (delay !== null) {
				const id = setInterval(tick, delay)

				// Cleanup
				return () => clearInterval(id)
			}
		}
	}, [savedCallback, delay])
}
