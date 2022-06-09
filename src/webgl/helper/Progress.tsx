// TODO:
// - cleanup and refactor this
// - export a version for DOM and CANVAS
// - add som style presets

import {Html as Html3, Loader, useProgress} from "@react-three/drei";
import React from "react";
import { ClientOnly } from '../../hoc/ClientOnly'

const customDataInterpolation = p => {
	//const p2 = Math.round(p * 100) / 100
	//const p2 = Math.round(p)
	const p2 = Math.trunc(p * 10) / 10
	//const p2 = Math.trunc(p)
	return `Loading ${p2}%`
	//return `Loading ${p2 == 100 ? 99 : p2}%`
}

function FallbackProgressBar({containerStyles = undefined, innerStyles = undefined, barStyles = undefined, dataStyles = undefined}) {
	const cs = containerStyles || {
		position: 'fixed'
	}
	const is = innerStyles || {
		backgroundColor: '#EDEDED'
	}
	const bs = barStyles || {
		backgroundColor: '#171717'
	}
	const ds = dataStyles || {
		color: '#171717'
	}

	//const cDI = useCallback(customDataInterpolation, [])
	//const cDI2 = useMemo(() => {
	//	return customDataInterpolation
	//}, [])
	//return <Html3 fullscreen={true} prepend><Loader containerStyles={{backgroundColor: '#1e5799'}} innerStyles={{backgroundColor: '#acacac'}} barStyles={{backgroundColor: '#171717'}} dataStyles={{color: '#171717'}} dataInterpolation={customDataInterpolation} /></Html3>
	return <Html3><Loader containerStyles={cs} innerStyles={is} barStyles={bs} dataStyles={ds} dataInterpolation={customDataInterpolation} /></Html3>
	//return <Html3><Loader dataInterpolation={customDataInterpolation} /></Html3>
}


function CustomFallbackProgress() {
	const {progress} = useProgress()
	const percent = Math.round(progress * 100) / 100
	//console.log(percent, 'percent111');
	if (percent < 100) {
		return <Html3 center style={{fontSize: '9px'}}>{percent} % loaded</Html3>
		//return <Html3 center portal={portalElem} /> ??
		//return <Html3><Modal message={`${percent}%`} /></Html3>
	}
	return null
}

const DomProgressBar = ({containerStyles = undefined, innerStyles = undefined, barStyles = undefined, dataStyles = undefined}) => {
	const cs = containerStyles || {
		background: 'transparent',
	}
	const is = innerStyles || {
		backgroundColor: '#EDEDED',
	}
	const bs = barStyles || {
		backgroundColor: '#171717',
	}
	const ds = dataStyles || {
		color: '#171717',
	}
	return <Loader containerStyles={cs} innerStyles={is} barStyles={bs} dataStyles={ds} dataInterpolation={customDataInterpolation} />
}
const DomProgressBarClientOnly = ({containerStyles = undefined, innerStyles = undefined, barStyles = undefined, dataStyles = undefined}) => {
	const cs = containerStyles || {
		background: 'transparent',
	}
	const is = innerStyles || {
		backgroundColor: '#EDEDED',
	}
	const bs = barStyles || {
		backgroundColor: '#171717',
	}
	const ds = dataStyles || {
		color: '#171717',
	}
	return (
		<>
			<ClientOnly>
				<Loader containerStyles={cs} innerStyles={is} barStyles={bs} dataStyles={ds} dataInterpolation={customDataInterpolation} />
			</ClientOnly>
		</>
	)
}

export {
	FallbackProgressBar, CustomFallbackProgress, DomProgressBar, DomProgressBarClientOnly
}
