import {useCloudsStore} from "../stores/CloudsStore";
import {Suspense, useEffect, useMemo} from "react";
import {Canvas as CanvasR3F} from "@react-three/fiber";
import canvasStyles from "../styles/Canvas.module.scss";
import {ResizeObserver} from "@juggle/resize-observer";
import {CameraRig} from "./CameraRig";
import {InstancedClouds} from "./InstancedClouds";
import {DomProgressBar, DomProgressBarClientOnly} from "../webgl/helper/Progress";

export const CanvasEtc = () => {
	//const setCanvasLoaded = useCloudsStore(state => state.setCanvasLoaded)

	//const [canvasRef, bounds] = useMeasure()
	//useEffect(() => {
	//	console.error('bounds', bounds)
	//}, [bounds])

	const [cloudConf, camProps] = useMemo(() => {
		return [
			{ //cloudConf
				count: 4000,
				//width: '???', // todo (currently: "count / 4")
				//height: '???', // todo
				//depth: 4000, // todo (currently 1 plane each unit)
			},
			{ //camProps
				fov: 30,
				near: 1,
				far: 3000,
				position: [0, 0, 6000],
			},
		]
	}, [])

	//const fogProps = useMemo(() => ({
	//	color: new Color(0x5299d1),
	//	near: -100,
	//	far: 3000,
	//}), [])

	return (
		<>

				<CanvasR3F
					//ref={canvasRef}
					className={`canvas ${canvasStyles.canvasBox} ${canvasStyles.moveable}`}

					//mode = "concurrent" // React mode: legacy | blocking | concurrent
					//dpr={[1, 2]}
					gl={{ // see WebGLRenderer.js
						antialias: false,
					}}
					frameloop="always"
					linear={true} // true == disables automatic sRGB encoding and gamma correction
					flat={true} // true == use THREE.NoToneMapping instead THREE.ACESFilmisToneMapping

					// some additional adjustments on the WebGLRenderer
					onCreated={(rootState) => {
						rootState.gl.setClearColor(0x000000)
						rootState.gl.setClearAlpha(1)
						rootState.gl.sortObjects = false
						rootState.gl.autoClear = false
						//rootState.gl.domElement.tabIndex=1

						//console.log('rootState.gl', rootState.gl)

						//setCanvasLoaded(true)
					}}

					resize={{
						polyfill: ResizeObserver, //for safari :(
						scroll: false
					}}
				>
					{/* add when objects (beside the clouds) need the fog
					<fog attach="fog" args={[fogProps.color, fogProps.near, fogProps.far]} />
					*/}
					<Suspense fallback={null}>
						<CameraRig
							offset={cloudConf.count}
							camProps={camProps}
						/>
						<InstancedClouds count={cloudConf.count}/>
					</Suspense>

					{/*
					<Stats showPanel={0} />
					<Perf position={'top-left'} />
					*/}
				</CanvasR3F>

				{/*
				<DomProgressBarClientOnly
				<DomProgressBar
					containerStyles={{
						zIndex: 1001, // just above <Leva>
						//background: '#FFFFFF',
						background: 'linear-gradient(to bottom,  #04142e 0%,#1d508f 37%,#5299d1 100%)', //how to add multiple background values here?
					}}
					dataStyles={{
						color: '#DDDDDD'
					}}
				/>
				*/}

		</>
	)
}

export default CanvasEtc
