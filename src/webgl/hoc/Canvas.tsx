/**
 * This should contain everything required for a proper <canvas> setup
 * - incl. lights, environment
 * - excl. models
 *
 * NOTE: keep this simple - extra configs for different requirements should be passed as props or added in a specified version of this file
 *
 * USAGE:
 * <Canvas antialias={true} tabIndex={0}
 */


import { useRef, forwardRef, useLayoutEffect, Suspense, useEffect, useMemo } from 'react'
import {Box3, Vector3, Sphere, Group, Fog, FogExp2, Color} from 'three';
import {Canvas as CanvasR3F, useThree} from '@react-three/fiber'
import {AdaptiveDpr, AdaptiveEvents, OrbitControls, OrthographicCamera} from "@react-three/drei";
import {ResizeObserver} from "@juggle/resize-observer";

import {handleCreated} from "../handler/onCreated";

import canvasStyles from "../../styles/Canvas.module.scss";
import {FallbackProgressBar} from "../helper/Progress";

const Lights = (props) => {
	return (
		<>
			<ambientLight intensity={1} />
			<pointLight position={[5, 20, 5]} intensity={1} castShadow />
		</>
	)
}

const SceneFog = ({fog}) => {
	// passed fog probably could be used as <primitive object={fog} attach="fog" /> but not sure about disposal
	if (fog.isFog) {
		return <fog attach="fog" args={[fog.color, fog.near, fog.far]} />
	} else if (fog.isFogExp2) {
		return <fogExp2 attach="fog" args={[fog.color, fog.density]} />
	}
}

const Cams = () => {
	const camRefP = useRef()
	const camRefO = useRef()
	//const {controls} = useThree()
	//const controls = useThree(({controls}) => controls);

	return (
		<>
			{/*
			<PerspectiveCamera ref={camRefP} makeDefault={true} />
			*/}
			<OrthographicCamera ref={camRefO} makeDefault={true} />
		</>
	)

}
const OrbitCtrls = (props) => {
	const controlsRef = useRef()

	return (
		<>
			<OrbitControls
				ref={controlsRef}
				makeDefault={true}
				regress={true}
				enablePan={true}
				//enableDamping={true} dampingFactor={0.1}
				enableDamping={false}
				enableRotate={true} rotateSpeed={0.5}
				enableZoom={true}
				//minDistance={20} maxDistance={120} // for PerspectiveCamera
				//minZoom={5} maxZoom={30} // for OrthographicCamera
				zoomSpeed={0.5}
				//minPolarAngle={0} maxPolarAngle={Math.PI}

				//screenSpacePanning={false}
			/>
		</>
	)
}

// this is actually the code from DREI's <Center> - without the forwardRef part and props.alignTop
const Center = ({children, ...props}) => {
	const outer = useRef<Group>(null!)
	const inner = useRef<Group>(null!)

	useLayoutEffect(() => {
		console.error(children, 'children')

		outer.current.position.set(0, 0, 0)
		outer.current.updateWorldMatrix(true, true)
		const box3 = new Box3().setFromObject(inner.current)
		const center = new Vector3()
		//const sphere = new Sphere()
		const height = box3.max.y - box3.min.y
		box3.getCenter(center)
		//box3.getBoundingSphere(sphere)
		outer.current.position.set(-center.x, -center.y, -center.z)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [children])

	return (
		<group {...props}>
			<group ref={outer}>
				<group ref={inner}>
					{children}
				</group>
			</group>
		</group>
	)
}


type CanvasHOCProps = JSX.IntrinsicElements['group'] & {
	frameloop?: 'demand' | 'always' | 'never',
	tabIndex?: number,
	antialias?: string
	alpha?: string
	withLights?: boolean
	withCams?: boolean
	withOrbitControls?: boolean
	centerOnCreated?: boolean
	adaptiveDpr?: boolean
	adaptiveEvents?: boolean
	adaptivePerformance?: boolean
	fog?: Fog | FogExp2
	backgroundColor?: number // not sure about that type
}

// is forwardRef even required? pro/contra when not currently used?
export const Canvas = forwardRef<Group, CanvasHOCProps>(
	function Canvas({
						children,
						frameloop = 'demand',
						tabIndex = 0,
						antialias = true,
						alpha = true,
						withLights = true,
						withCams = false,
						withOrbitControls = true,
						centerOnCreated = false, // this only works onCreated or when direct children are updated (aka: does not work with grouped children aka components with children)
						adaptiveDpr = false,
						adaptiveEvents = true,
						adaptivePerformance = true,
						fog,
						backgroundColor,
						...canvasProps
					}, ref) {

		//const bgColor = useMemo(() => {
		//	if (backgroundColor) {
		//		if (backgroundColor.isColor) {
		//			return clearColor
		//		} else {
		//			return new Color(clearColor)
		//		}
		//	}
		//	return null
		//}, [backgroundColor])

		return (
			<>
				{/*NOTE: <Canvas> adds it's own wrapper div and passes: id, className, tabIndex, style - rest will be added to the <canvas> */}
				<CanvasR3F
					ref={ref}
					tabIndex={tabIndex}
					//linear={true} // was colorManagement={false} before
					//orthographic
					//camera={{ zoom: 100, position: [0, 0, Math.PI / 2], fov: 35 }}
					raycaster={null} // not sure this is doing anything
					frameloop={frameloop} // 'always' | 'demand' | 'never'
					//className={`canvas ${canvasStyles.grabbable}`}
					className={`${canvasStyles.canvasBox} ${canvasStyles.bg4} canvas ${canvasStyles.grabbable}`}
					dpr={[1, 2]}
					shadows
					performance={{min: 0.33}}
					resize={{
						polyfill: ResizeObserver, //for safari :(
						scroll: false
					}}

					//onWheel={handleScrollCB}

					antialias={antialias} // default true // wrong place?
					alpha={alpha} // default true // wrong place?
					//powerPreference="high-performance" // "default" | "high-performance" | "low-power";

					//mode={'concurrent'} // React mode: legacy | blocking | concurrent

					//onCreated={handleCreated}
					onCreated={(rootState) => {
						handleCreated({
							...rootState,
							extraProps: {
								adaptivePerformance, //this should auto-convert to "adaptivePerformance: adaptivePerformance"
								centerOnCreated, //this should auto-convert to "centerOnCreated: centerOnCreated"
							}
						})
					}}

					{...canvasProps}
				>
					{/* NOTE: 0x000000 (black) will is equal to 0 (zero) */}
					{backgroundColor !== undefined && <color attach="background" args={[backgroundColor]} />}

					{withLights && <Lights />}
					{withCams && <Cams />}
					{withOrbitControls && <OrbitCtrls />}

					{/*
						{centerOnCreated ? <Center>{children}</Center> : <>{children}</>}
						*/}
					{/*<Suspense fallback={<FallbackProgressBar />}>*/}
						{fog && <SceneFog fog={fog} />}
						<group name={'sceneContent'}>{/* TODO: */}
							{children}
						</group>
					{/*</Suspense>*/}

					{frameloop === 'demand' && adaptiveDpr && <AdaptiveDpr pixelated={true} />} {/* will cut the pixel-ratio on regress according to the canvases performance min/max settings */}
					{frameloop === 'demand' && adaptiveEvents && <AdaptiveEvents />} {/* will switch off the raycaster while the system is in regress. */}
				</CanvasR3F>
			</>
		)
	}
)
