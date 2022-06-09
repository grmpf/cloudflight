/**
 * TODO:
 * - Try to get rid of "linear: true" on the <Canvas>
 * >- This might need some sort of fix for the texture or shader
 * >- Undo lighting/color tweaks just to make things look good for "linear" (this is the old way of doing things and not required anymore, most of the time).
 * >- Make a list of possible places for a RGB/Linear mismatch (RGB should be default by now but something might be missing in custom materials/shaders).
 * >- Compare results of default material/shader and custom material/shader WITHOUT instances
 * - Disable the raycaster completely or use a simpler one
 */

import {useRouter} from 'next/router'
import {useEffect, useMemo} from 'react'

import {useCloudsStore} from '../stores/CloudsStore'
import {BottomLeft, BottomRight, TopCenter} from '../components/Nav'

// TEST STUFF
import dynamic from 'next/dynamic'
import {CanvasEtc} from "../components/CanvasEtc";
import {LevaCtrl} from "../components/LevaCtrl";
import {ClientOnly} from "../hoc/ClientOnly";
import canvasStyles from "../styles/Canvas.module.scss";
import {DomProgressBar, DomProgressBarClientOnly} from "../webgl/helper/Progress";
import {gitHubLink, gitHubRepoLink} from "../next-seo.config";
import {useGLTF} from "@react-three/drei";


// TEST
//const DynamicLevaCtrl = dynamic(
//	() => import('../components/LevaCtrl').then((mod) => mod.LevaCtrl),
//	{ ssr: false }
//)
//const DynamicCanvasEtc = dynamic(
//	() => import('../components/CanvasEtc').then((mod) => mod.CanvasEtc),
//	{ ssr: false }
//)


/* TO BE TESTED
export async function getServerSideProps(context) {
	console.log('context.query', context.query)
	return {
		props: { // will be passed to the page component as props
			qs: context.query,
		},
	}
}
*/



const handlePointerDown = (event, setBoostMode) => {
	event.preventDefault()
	setBoostMode(true)
}
const handlePointerUp = (event, setBoostMode) => {
	event.preventDefault()
	setBoostMode(false)
}

const CloudsPage = () => {
	//TODO: make querystring available on first render while keeping next.js happy
	const { query, isReady } = useRouter()

	const setBoostMode = useCloudsStore(state => state.setBoostMode)
	//const canvasLoaded = useCloudsStore(state => state.canvasLoaded) // set too early (not very useful)

	//TODO?: merge all/some of these into one obj - each of them trigger a rerender of the mesh anyway
	const setTypeToShow = useCloudsStore( state => state.setTypeToShow )
	const setShowSeconds = useCloudsStore( state => state.setShowSeconds )
	const setFontSize = useCloudsStore( state => state.setFontSize )
	const setFontFamily = useCloudsStore( state => state.setFontFamily )
	const setLetterSpacing = useCloudsStore( state => state.setLetterSpacing )
	const setLineHeight = useCloudsStore( state => state.setLineHeight )
	const setFontColor = useCloudsStore( state => state.setFontColor )
	const setOptionalText = useCloudsStore( state => state.setOptionalText )

	//TODO: un-uglify - build or use existing querystring handler
	const embed = useMemo(() => {
		let e = false // must be false so controls will show by default but as long as isReady=false, the controls won't show
		if(isReady && query.embed !== undefined) {
			const eTmp = (Array.isArray(query.embed) ? query.embed[0] : query.embed)
			e = !(eTmp === '0' || eTmp === 'false')
		}
		return e
	}, [isReady, query.embed])
	useEffect(() => {
		if(isReady) {
			//this should run once per page load
			if(query.type !== undefined) {
				const tTmp = (Array.isArray(query.type) ? query.type[0] : query.type)
				if(tTmp === 'clock' || tTmp === 'text' || tTmp === 'image') {
					setTypeToShow(tTmp)
				}
			}
			if(query.sec !== undefined) {
				const ssTmp = (Array.isArray(query.sec) ? query.sec[0] : query.sec)
				if(ssTmp !== undefined) {
					const showS = !(ssTmp === '0' || ssTmp === 'false');
					setShowSeconds(showS)
				}
			}
			if(query.size !== undefined) {
				const fs = (Array.isArray(query.size) ? parseFloat(query.size[0]) : parseFloat(query.size))
				if(fs !== undefined) {
					setFontSize(fs)
				}
			}
			//font-family
			if(query.ff !== undefined) {
				const ff = (Array.isArray(query.ff) ? query.ff[0] : query.ff)
				if(ff !== undefined) {
					setFontFamily(ff)
				}
			}
			if(query.ls !== undefined) {
				const ls = (Array.isArray(query.ls) ? parseFloat(query.ls[0]) : parseFloat(query.ls))
				if(ls !== undefined) {
					setLetterSpacing(ls)
				}
			}
			if(query.lh !== undefined) {
				const ls = (Array.isArray(query.lh) ? parseFloat(query.lh[0]) : parseFloat(query.lh))
				if(ls !== undefined) {
					setLineHeight(ls)
				}
			}
			if(query.color !== undefined) {
				const fc = (Array.isArray(query.color) ? query.color[0] : query.color)
				if(fc !== undefined) {
					setFontColor(fc)
				}
			}
			if(query.text !== undefined) {
				//console.log('setOptionalText111', isReady, query.text)
				const ot = (Array.isArray(query.text) ? query.text[0] : query.text)
				if(ot !== undefined) {
					setOptionalText(ot)
				}
			}
		}

	}, [
		isReady,
		query.type, query.sec, query.size, query.ls, query.color, query.ff, query.lh, query.text,
		setTypeToShow, setShowSeconds, setFontSize, setLetterSpacing, setFontColor, setFontFamily, setLineHeight, setOptionalText
	])

	return (
		<>
			<div
				className={`canvasWrapper ${canvasStyles.bgSky}`}
				//onMouseDown={(e) => handlePointerDown(e, setBoostMode)}
				//onMouseUp={(e) => handlePointerUp(e, setBoostMode)}
				onPointerDown={(e) => handlePointerDown(e, setBoostMode)}
				onPointerUp={(e) => handlePointerUp(e, setBoostMode)}
				onPointerLeave={(e) => handlePointerUp(e, setBoostMode)}
			>

				{/* Does not really work with the DomProgressBar
				<DynamicCanvasEtc />
				*/}
				<ClientOnly>
					<CanvasEtc />
				</ClientOnly>

				<DomProgressBarClientOnly
					containerStyles={{
						zIndex: 1001, // just above <Leva>
						//background: '#FFFFFF',
						background: 'linear-gradient(to bottom,  #04142e 0%,#1d508f 37%,#5299d1 100%)', //how to add multiple background values here?
					}}
					dataStyles={{
						color: '#DDDDDD'
					}}
				/>
			</div>

			{!embed && isReady && <>
				<ClientOnly>
					<TopCenter />
					<BottomLeft githubUrl={gitHubRepoLink} />
					<BottomRight githubUrl={gitHubRepoLink} />

					{isReady && <LevaCtrl />}
				</ClientOnly>
			</>}

		</>
	)
}

export default CloudsPage

useGLTF.preload([
	'/assets/glb/plant_model.gltf',
	'/assets/glb/WhaleB.gltf',
])


