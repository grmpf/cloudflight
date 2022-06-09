import { useEffect, useMemo, useRef, useState } from 'react'
import { MathUtils, MeshBasicMaterial, Vector3 } from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, Text as Text3 } from '@react-three/drei'

import { cloudsDefaults } from '../../stores/cloudsDefaults'
import { useCloudsStore } from '../../stores/CloudsStore'
import { visibleHeightAtZDepth2 } from '../../webgl/util/size'
import { GLBLoaderAnimated } from '../../webgl/loader/GLBModel'
import useStateAsToggle from '../../hooks/useStateAsToggle'
import { timeNow } from '../../util/time'

const DEG2RAD = Math.PI / 180
//const RAD2DEG = 180 / Math.PI
const whaleRotLimit = 30 * DEG2RAD

const showWhale = true //TODO: make this a config

const Lights = (/*{ target = undefined }*/) => {
	const aLightRef = useRef()
	const pLightRef = useRef()
	//const dLightRef = useRef()

	return (
		<>
			<ambientLight ref={aLightRef} intensity={1} position={[0, 10, 0]} />
			<pointLight ref={pLightRef} position={[5, 10, 5]} intensity={1} /*castShadow*/ />
			{/*
			<ambientLight ref={aLightRef} intensity={0.5} position={[0, 10, 0]} />
			<pointLight ref={pLightRef} position={[5, 10, 5]} intensity={0.5}
						//castShadow
			/>
			{/*
			{target && <directionalLight
				ref={dLightRef}
				//color={0xffeedd}
				//hsv={[0, 0, 0.8647058823529412]}
				position={[0, 10, -10]}
				target={target?.current}
			/>}
			*/}
		</>
	)
}


//TODO: rename vars and make them Refs?
let lastModuloOffsetZ = 0
let lastModuloOffsetY = 0
//let dummyVec3 = new Vector3()
let boostTickerLerp = 0.0
let boostTicker = 0.0
//let elapsedTime2 = 0.0 // TODO: reset value at some point.

//TODO: rename vars and make a config file of them
const textPosY = 2.0
const flySpeed = 30
const fallSpeed = 100
const CameraRig = ({ offset, camProps = {} }) => {
	const cameraRefP = useRef()
	const whaleGroupRef = useRef()
	const textRef = useRef()

	// to handle faster flySpeed on mouseDown
	const boostMode = useCloudsStore(state => state.boostMode)

	// Also used by Leva controls
	const typeToShow = useCloudsStore( state => state.typeToShow )
	const showSeconds = useCloudsStore( state => state.showSeconds )
	const fontColor = useCloudsStore( state => state.fontColor )
	const fontSize = useCloudsStore( state => state.fontSize )
	const fontFamily = useCloudsStore( state => state.fontFamily )
	const letterSpacing = useCloudsStore( state => state.letterSpacing )
	const lineHeight = useCloudsStore( state => state.lineHeight )
	const optionalText = useCloudsStore( state => state.optionalText )

	const size = useThree(({ size }) => size)
	const aspect = useMemo(() => {
		return size.width / size.height
	}, [size.width, size.height])

	const material = useMemo(() => {
		//return new MeshStandardMaterial()
		return new MeshBasicMaterial()
	}, [])

	const flyInText = useMemo(() => {
		if(typeToShow === 'clock') {
			return timeNow(showSeconds)
		}
		if(typeToShow === 'text' && optionalText) {
			return optionalText.replace(/~/g, "\n")
		}
		return ''
	}, [typeToShow, showSeconds, optionalText])

	useEffect(() => {
		if(textRef?.current) {
			if(typeToShow === 'text') {
				//textRef.current.text = optionalText
				//textRef.current.sync()

				//setOptionalText(optionalText)
			}
		}
	}, [textRef, typeToShow, optionalText])


	// TODO: find a better solution to get the inital values
	const [maxZPos, setMaxZPos] = useState(-offset)
	const [initWhalePosY, setInitWhalePosY] = useState(0)
	useEffect(() => {
		if (cameraRefP.current) {
			setMaxZPos(-offset + cameraRefP.current.position.z)
			setInitWhalePosY(visibleHeightAtZDepth2(cameraRefP.current, offset) / 2)
		}
	}, [cameraRefP, offset])

	const whalePos = useMemo(() => {
		return [
			Math.random() * 1000 - 500, // => a range of -500 and 500
			initWhalePosY,
			Math.random() * (maxZPos + maxZPos / 2) - maxZPos / 2,
		]
	}, [maxZPos, initWhalePosY])

	const whaleRotY = useMemo(() => {
		return Math.random() * (2 * whaleRotLimit) - whaleRotLimit
	}, [])

	const [clockTriggerValue, triggerClockUpdate] = useStateAsToggle(false);
	useEffect(() => {
		if(typeToShow === 'clock') {
			const interval = setInterval(() => {
				//console.warn('tick-tock')
				triggerClockUpdate()
			}, showSeconds ? 1000 : 20000) // 3x per minute is too much but gets us closer to the real time

			// cleanup
			return () => clearInterval(interval)
		}
	}, [typeToShow, showSeconds, triggerClockUpdate]);

	useEffect(() => {
		if(textRef?.current && typeToShow === 'clock' && (clockTriggerValue || !clockTriggerValue)) {
			textRef.current.text = timeNow(showSeconds)
			//textRef.current.text = '10:42'
			textRef.current.sync()
		}
	}, [textRef, typeToShow, showSeconds, clockTriggerValue])
	//useEffect(() => {
	//	if(textRef?.current && typeToShow === 'text') {
	//		textRef.current.text = optionalText.replace(/~/g, "\n")
	//		textRef.current.sync()
	//	}
	//}, [textRef, typeToShow, showSeconds, clockTriggerValue, optionalText])


	// to trigger text flyIn later
	//const [showStuff, setShowStuff] = useState(false)
	//useEffect(() => {
	//	setTimeout(() => {
	//		setShowStuff(true)
	//	}, 1000)
	//}, [setShowStuff])

	// TODO:
	// - tying things to clock/delta makes the code a bit ugly -> cleanup
	// - figure out what to use: delta, clock.elapsedTime or clock.getElapsedTime()
	// - use a custom clock which can be reset (e.g. each time when paused for a while) to avoid calculations with values growing indefinitely
	// - try improving performance by putting recurring stuff in their own functions (memo?)
	useFrame(({ clock, mouse }/*, delta*/) => {
		//// needed to keep track of actual position
		boostTickerLerp = MathUtils.lerp(boostTickerLerp, boostMode ? 6.5 : 0.0, 0.025)
		boostTicker += boostTickerLerp

		const elapsedTime0 = clock.elapsedTime // slightly after clock.getElapsedTime() but could be faster
		//const elapsedTime1 = clock.getElapsedTime()
		//elapsedTime2 += delta // about 6.8% behind compared to elapsedTime
		//console.log(elapsedTime0, elapsedTime1, elapsedTime2)

		const timeTmpFly = elapsedTime0 * flySpeed
		const timeTmpFall = elapsedTime0 * fallSpeed
		const timeTmp = timeTmpFly + boostTicker
		const camPosZ = timeTmp % offset

		//// limit mouse movements
		let mouseX = mouse.x * 50 // "divide" halfWidth in 50 units
		let mouseY = mouse.y * 30 // "divide" halfHeight in 30 units
		if (mouseY > 20) { // Y limited 2/3 above horizon
			mouseY = 20
		}
		//if (mouseY < -10) { // Y limited 1/3 below horizon
		//	mouseY = -10
		//}
		if (mouseY < 0) { // Y limited below horizon
			mouseY = 0
		}

		if (textRef.current) {
			//v1
			//textRef.current.position.y = MathUtils.lerp(textRef.current.position.y, 0.5, 0.025)
			//textRef.current.position.z = MathUtils.lerp(textRef.current.position.z, boostMode ? -19.5 : -20, 0.025)

			//v2
			//textRef.current.position.lerp(dummyVec3.set(
			//	textRef.current.position.x,
			//	textRef.current.position.y + (0.5 - textRef.current.position.y),
			//	textRef.current.position.z + ((boostMode ? -19.5 : -20) - textRef.current.position.z)
			//), 0.025)

			//v0
			// lerp / interpolate position of flyInText
			textRef.current.position.set(
				textRef.current.position.x,
				textRef.current.position.y + (0.5 - textRef.current.position.y) * 0.025,
				textRef.current.position.z + ((boostMode ? -19.5 : -20) - textRef.current.position.z) * 0.025,
			)
		}

		if (cameraRefP?.current) {
			// lerp / interpolate cameraRig position
			cameraRefP.current.position.set(
				cameraRefP.current.position.x + (mouseX - cameraRefP.current.position.x) * 0.009,
				cameraRefP.current.position.y + ((boostMode ? 10 : mouseY) - cameraRefP.current.position.y) * 0.009,
				-camPosZ + offset,
			)
			cameraRefP.current.lookAt(
				cameraRefP.current.position.x,
				cameraRefP.current.position.y,
				cameraRefP.current.position.z - 1000,
			)
		}

		if (cameraRefP?.current && whaleGroupRef?.current) {
			// this would jump back further and further but works as expected as long as new position values are set later on
			// TODO: catch offset === 0
			const moduloOffsetZ = (timeTmp - (timeTmp % offset)) / offset
			if (moduloOffsetZ != lastModuloOffsetZ) {
				lastModuloOffsetZ = moduloOffsetZ

				// resets z position when traveled the distance of offset
				// this way it also works when passing the reset point a bit (unlike resetting to a specific position)
				whaleGroupRef.current.position.z += offset
			}

			let whalePosY = 0
			let moduloOffsetY = 0
			if (initWhalePosY !== 0) {
				whalePosY = timeTmpFall % (initWhalePosY * 2)
				moduloOffsetY = (timeTmpFall - (timeTmpFall % (initWhalePosY * 2))) / (initWhalePosY * 2)
			}
			whaleGroupRef.current.position.y = initWhalePosY - whalePosY
			if (lastModuloOffsetY != moduloOffsetY) {
				lastModuloOffsetY = moduloOffsetY

				// resets position when whale did fall through the screen
				whaleGroupRef.current.position.x = Math.random() * 1000 - 500 // => a range of -500 and 500
				whaleGroupRef.current.rotation.y = Math.random() * (2 * whaleRotLimit) - whaleRotLimit // => a range of -whaleRotLimit and whaleRotLimit
				whaleGroupRef.current.position.z = (-camPosZ + offset - cameraRefP.current.far) - (Math.random() * maxZPos - maxZPos * 0.75) // => a range of -maxZPos and maxZPos/2
			}
		}
	})

	return (
		<>
			<PerspectiveCamera
				ref={cameraRefP}
				makeDefault={true}
				aspect={aspect}

				{...camProps}
			>

				<group>
					<Lights /*target={textRef}*/ />

					{/*showStuff &&*/ flyInText !== '' && <Text3
						ref={textRef}

						position-y={-textPosY}
						position-z={-80}

						color={`#${fontColor}`}
						fontSize={fontSize / cloudsDefaults.fontSizeFactor}
						letterSpacing={letterSpacing / cloudsDefaults.letterSpacingFactor}
						lineHeight={lineHeight / cloudsDefaults.lineHeightFactor}

						// PREP
						//outlineWidth={0.02 / cloudsDefaults.outlineWidthFactor}
						////outlineColor={'#04142e'} //4, 20, 46
						////outlineColor={'#FFFFFF'}
						//outlineColor={'#282828'}
						//strokeWidth={0.03}
						//strokeColor={'#1d50f3'} //29, 80, 143
						//strokeColor={'#5299d1'} //82, 153, 209

						//maxWidth={44} //TODO: figure out how this unit works and how to apply visibleWidthAtZDepth()
						textAlign={'center'}

						anchorX='center'
						//anchorY='bottom'
						anchorY='bottom-baseline'

						scale={0.5} //TODO: remove this (unless required for quality reasons or something)
						material={material}
						font={fontFamily}

						//debugSDF={true}
					>
						{flyInText || ''}
					</Text3>}

				</group>
			</PerspectiveCamera>

			{showWhale && <group ref={whaleGroupRef} position={whalePos} rotation-y={whaleRotY}>
				{/* models should be automatically cached and reusable
					But there might be an issue with re-adding the material and maybe geometry - possibly because of the whale flying through the frustum (culling)
					TODO: Disabling the culling should do the trick. In this case it does help optimize anything (on the contrary) and could just be disabled.
				*/}
				<GLBLoaderAnimated castShadow={false} receiveShadow={false}
					url={'/assets/glb/plant_model.gltf'}
					scale={5}
					position-x={-50}
				/>

				<group position-x={50}>
					<GLBLoaderAnimated castShadow={false} receiveShadow={false}
						url={'/assets/glb/WhaleB.gltf'}
						scale={20}
						speed={0.0000001}
						rotation-x={Math.PI / 2}
						rotation-z={Math.PI}

						//metalness={0.1}
						//roughness={0.1}
						//shininess={0.1}
					/>
				</group>
			</group>}

		</>
	)
}


export { CameraRig }
