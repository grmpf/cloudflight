/** LevaCtrl info
 * - The idea is to use leva only as the gui and only use it when &embed=0.
 * - Therefore this file includes handling the global zustand store - even though leva already has its own store.
 * - This component defines all the controls even though leva was built to simply define new controls wherever needed.
 * - Leva shows the controls as soon as useControls() is used. Therefore the <Leva> component is optional any only for settings.
 * - NOTE: Leva is still in beta
 **/

/** TODO:
 * - input change triggers only on blur
 */

import { useEffect } from 'react'
import { useCloudsStore } from '../../stores/CloudsStore'
import { button, Leva, LevaInputs, useControls, folder } from 'leva'
import { parse, stringify } from 'querystring'
import { cloudsDefaults } from '../../stores/cloudsDefaults'

const handleClick = async (getLeva) => {
	const typeToShow = getLeva('typeToShow')
	const showSeconds = getLeva('showSeconds')
	const fontSize = +getLeva('fontSize')
	const letterSpacing = +getLeva('letterSpacing')
	const lineHeight = +getLeva('lineHeight')
	const fontColor = getLeva('fontColor')
	const fontFamily = getLeva('fontFamily')
	const optionalText = getLeva('optionalText')
	const img = getLeva('img')
	const imgSize = getLeva('imgSize')

	let showClock = false;
	let showText = false;
	let showImg = false;
	if(typeToShow === 'clock') {
		showClock = true;
	}
	if(typeToShow === 'image' && img && imgSize > 0) {
		showImg = true;
	}
	if(typeToShow === 'text' && optionalText !== '') {
		showText = true;
	}

	let values = {
		embed: 1,
	}
	if (showClock || showText || showImg) {
		//only add if required (defaults to type='text' with optionalText='' aka nothing but clouds)
		values['type'] = typeToShow
	}
	if (showClock) {
		//values['sec'] = showSeconds ? 1 : 0
		if (!!showSeconds !== !!cloudsDefaults.showSeconds) {
			values['sec'] = !!showSeconds ? 1 : 0
		}
	}
	if (showClock || showText) {
		if (fontSize) {
			values['size'] = fontSize
		}
		if (letterSpacing /*&& letterSpacing !== cloudsDefaults.letterSpacing*/) {
			values['ls'] = letterSpacing
		}
		if (fontColor) {
			values['color'] = fontColor.charAt(0) === '#' ? fontColor.substring(1) : fontColor
		}
		/* TODO: use a key to make this work
		if (fontFamily && fontFamily !== cloudsDefaults.fontFamily) {
			values['ff'] = fontFamily
		}
		*/
	}
	if (showText) {
		if (lineHeight && lineHeight !== cloudsDefaults.lineHeight && optionalText.indexOf('~') > -1) {
			values['lh'] = lineHeight
		}
		values['text'] = optionalText
	}
	//if(showImg) {
	//	values['img'] =
	//}

	//console.error('configValues', values)

	const configUrl = `${process.env.NEXT_PUBLIC_HOST}/?${stringify(values)}`
	try {
		await navigator.clipboard.writeText(configUrl)
		alert(`Copied to clipboard.`)
	} catch (e) {
		// todo: show some modal msg
		alert(`Could not copy to clipboard:\n${configUrl}`)
		console.error(`Could not copy to clipboard:\n${configUrl}`)
	}
}

const LevaCtrl = () => {
	const typeToShow = useCloudsStore( state => state.typeToShow )
	const showSeconds = useCloudsStore( state => state.showSeconds )
	const fontSize = useCloudsStore( state => state.fontSize )
	const letterSpacing = useCloudsStore( state => state.letterSpacing )
	const lineHeight = useCloudsStore( state => state.lineHeight )
	const fontColor = useCloudsStore( state => state.fontColor )
	const fontFamily = useCloudsStore( state => state.fontFamily )
	const optionalText = useCloudsStore( state => state.optionalText )

	//const showOutline = true
	//const outlineWidth = 0.02
	//const outlineColor = '282828'

	const setTypeToShow = useCloudsStore( state => state.setTypeToShow )
	const setShowSeconds = useCloudsStore( state => state.setShowSeconds )
	const setFontSize = useCloudsStore( state => state.setFontSize )
	const setLetterSpacing = useCloudsStore( state => state.setLetterSpacing )
	const setLineHeight = useCloudsStore( state => state.setLineHeight )
	const setFontColor = useCloudsStore( state => state.setFontColor )
	const setFontFamily = useCloudsStore( state => state.setFontFamily )
	const setOptionalText = useCloudsStore( state => state.setOptionalText )


	const [levaValues, setLeva] = useControls(() => ({
		// TODO
		//paused: { // could only render a new image every minute (not showing seconds)
		//	label: 'Paused',
		//	value: false,
		//	disabled: true,
		//},
		//noWhale: {
		//	label: 'No Whale :(',
		//	value: false,
		//	disabled: true,
		//},
		//speedRange: {
		//	label: 'Speed-Range',
		//	value: [0.0, 6.5],
		//	min: 0.0,
		//	max: 10.0,
		//	step: 0.1,
		//	disabled: true,
		//},
		//mouseSensitivity: {
		//	label: 'Mouse Sensitivity',
		//	hint: '&ms=0 - Set 0 to disable',
		//	value: 1.0,
		//	min: 0.0,
		//	max: 3.0,
		//	step: 0.1,
		//	render: (get) => get('useMouse') === true,
		//	//disabled: true,
		//},


		typeToShow: {
			label: 'Type',
			value: typeToShow,
			options: {
				'Text': 'text',
				'Clock': 'clock',
				//'Image': 'image',
			},
			onChange: (value) => {
				setTypeToShow(value)
			},
		},


		//'Text': folder({
			optionalText: {
				//label: 'Value',
				label: 'Text',
				hint: '~ for newline. Updates onBlur()',
				value: optionalText,
				type: LevaInputs.STRING,
				render: (get) => get('typeToShow') === 'text',
				onChange: (value, path, context) => {
				//onEditEnd: (value, path, context) => {
					setOptionalText(value)
				},
			},
		//}),

		//'Clock': folder({
			//mode24: {
			//	label: '24h-Mode',
			//	value: true,
			//	render: (get) => get('typeToShow') === 'clock',
			//	disabled: true,
			//},
			showSeconds: {
				label: 'Show Seconds',
				hint: 'Might be removed in the future',
				value: showSeconds,
				//value: false,
				type: LevaInputs.BOOLEAN,
				render: (get) => get('typeToShow') === 'clock',
				onChange: (v) => {
					setShowSeconds(v)
				},
			},
		//}),


		//'Image': folder({
			img: {
				label: 'Image',
				type: LevaInputs.IMAGE,
				render: (get) => get('typeToShow') === 'image',
				onChange: (value, path, context) => {
					//console.count('Image')
					//console.error(value, path, context.value)
					//setImg(value)
				},
			},
			imgSize: {
				label: 'Image-Size',
				//value: imgSize
				value: 2.0,
				min: 0.0,
				max: 20,
				step: 0.1,
				type: LevaInputs.NUMBER,
				render: (get) => get('typeToShow') === 'image',
				onChange: (v) => {
					//- triggers too often (here changes could be applied to the scene but updating state that often is bad)
					//console.count('ImageSize')
					//setImgSize(Math.round(v * 10) / 10)
				},
			},
		//}),



		//'Font': folder({
			fontSize: {
				label: 'Font-Size',
				value: fontSize,
				//value: 2.0,
				min: 1.5 * cloudsDefaults.fontSizeFactor,
				max: 12.0 * cloudsDefaults.fontSizeFactor,
				step: 0.1 * cloudsDefaults.fontSizeFactor,
				type: LevaInputs.NUMBER,
				render: (get) => (get('typeToShow') === 'clock' || get('typeToShow') === 'text'),
				onChange: (v) => {
					//TODO:
					//- triggers too often (here changes could be applied to the scene but state updates that often is bad)
					//- check for value change somehow? (otherwise in the zustand store)
					//- interval to reduce calls (throttle/debounce)
					setFontSize(Math.round(v))
				},
			},
			//' ': buttonGroup({
			//	'1x': () => setLeva({ fontSize: 1 }),
			//	'2x': () => setLeva({ fontSize: 2 }),
			//	'3x': () => setLeva({ fontSize: 3 }),
			//	'4x': () => setLeva({ fontSize: 4 }),
			//	'5x': () => setLeva({ fontSize: 5 }),
			//}),
			letterSpacing: {
				label: 'Letter-Spacing',
				value: letterSpacing, // 0.02 * cloudsDefaults.letterSpacingFactor
				//value: 2.0,
				min: -0.32 * cloudsDefaults.letterSpacingFactor,
				max: 2.0 * cloudsDefaults.letterSpacingFactor,
				step: 0.01 * cloudsDefaults.letterSpacingFactor,
				type: LevaInputs.NUMBER,
				render: (get) => (get('typeToShow') === 'clock' || get('typeToShow') === 'text'),
				onChange: (v) => {
					setLetterSpacing( Math.round(v) )
				},
			},
			lineHeight: {
				label: 'Line-Height',
				hint: '~ in "Text" for newline',
				value: lineHeight, // 1.0 * cloudsDefaults.lineHeightFactor
				//value: 2.0,
				min: 0.7 * cloudsDefaults.lineHeightFactor,
				max: 1.3 * cloudsDefaults.lineHeightFactor,
				step: 0.01 * cloudsDefaults.lineHeightFactor,
				type: LevaInputs.NUMBER,
				render: (get) => {
					return get('typeToShow') === 'text' && get('optionalText').indexOf('~') > -1 //check for linebreaks
					//&& get('lineHeight') !== cloudsDefaults.lineHeight // makes this a hidden feature for now (via &lh=1.1)
				},
				onChange: (v) => {
					setLineHeight( Math.round(v * 100) / 100 )
				},
			},
			fontFamily: {
				label: 'Family',
				value: fontFamily,
				options: { //https://google-webfonts-helper.herokuapp.com/api/fonts/raleway
					'work in progress': 'https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff',


					//raleway has those arty numbers by default? can they be disabled?
					'Raleway 900': 'https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff', //900

					//'Roboto 400': 'https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff', // DEFAULT FONT
					//'Roboto 400b': 'https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxM.woff', // 400 (same as default)
					//'Roboto 700': 'https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmWUlfBBc-.woff', // 700
					'Roboto 900': 'https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmYUtfBBc-.woff', // 900

					'Ubuntu 700': 'https://fonts.gstatic.com/s/ubuntu/v15/4iCv6KVjbNBYlgoCxCvjsGyL.woff', //700

					/* buggy with e.g $
					'Raleway 700 v22': 'https://fonts.gstatic.com/s/raleway/v22/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVs9pbCIPrc.woff', //700
					'Raleway 800 v22': 'https://fonts.gstatic.com/s/raleway/v22/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVtapbCIPrc.woff', //800
					'Raleway 900 v22': 'https://fonts.gstatic.com/s/raleway/v22/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVtzpbCIPrc.woff', //900
					*/
				},
				render: (get) => (get('typeToShow') === 'clock' || get('typeToShow') === 'text'),
				onChange: (value, path, context) => {
					setFontFamily(value)
				},

				disabled: true,
			},
			fontColor: {
				label: 'Color',
				//value: '#123456',
				value: `#${fontColor}`,
				type: LevaInputs.COLOR,
				render: (get) => (get('typeToShow') === 'clock' || get('typeToShow') === 'text'),
				onChange: (value) => {
					setFontColor(value.charAt(0) === '#' ? value.substring(1) : value)
				},
			},

			//showOutline: {
			//	label: 'Show Outline',
			//	value: showOutline,
			//	//value: false,
			//	type: LevaInputs.BOOLEAN,
			//	onChange: (value, path, context) => {
			//		console.count('showOutline')
			//		console.log('path', path)
			//	},
			//},
			//'Outline': folder({
			//	outlineWidth: {
			//		label: 'Width',
			//		value: outlineWidth * cloudsDefaults.outlineWidthFactor, // 0.02
			//		//value: 2.0,
			//		min: 0.0  * cloudsDefaults.outlineWidthFactor,
			//		max: 0.2 * cloudsDefaults.outlineWidthFactor,
			//		step: 0.01 * cloudsDefaults.outlineWidthFactor,
			//		type: LevaInputs.NUMBER,
			//		onChange: (v) => {
			//			console.count('outlineWidth')
			//			//console.error('outlineWidth', Math.round(v) )
			//			//setOutlineWidth( Math.round(v) )
			//		},
			//	},
			//	outlineColor: {
			//		label: 'Color',
			//		value: `#${outlineColor}`,
			//		type: LevaInputs.COLOR,
			//		onChange: (value, path, context) => {
			//			console.count('outlineColor')
			//			//console.error(value, path, context.value)
			//			//setOutlineColor(value.charAt(0) === '#' ? value.substring(1) : value)
			//		},
			//	},
			//}, {
			//	//collapsed: true,
			//	render: (get) => get('Font.showOutline') === true,
			//}),

		//}),

		'COPY URL': button((get) => handleClick(get)),
	})
		// would trigger all handlers on each change
		//, [
		//	//typeToShow, showSeconds, fontSize, fontColor, optionalText,
		//	//setTypeToShow, setShowSeconds, setFontSize, setFontColor, setOptionalText,
		//	//handleClick
		//]
	)
	//console.error('levaValues', levaValues)

	useEffect(() => { setLeva({ typeToShow: typeToShow }) }, [ setLeva, typeToShow ])
	useEffect(() => { setLeva({ showSeconds: !!showSeconds }) }, [ setLeva, showSeconds ])
	useEffect(() => { setLeva({ fontSize: fontSize }) }, [ setLeva, fontSize ])
	useEffect(() => { setLeva({ letterSpacing: letterSpacing }) }, [ setLeva, letterSpacing ])
	useEffect(() => { setLeva({ lineHeight: lineHeight }) }, [ setLeva, lineHeight ])
	useEffect(() => { setLeva({ fontFamily: fontFamily }) }, [ setLeva, fontFamily ])
	useEffect(() => { setLeva({ fontColor: `#${fontColor}` }) }, [ setLeva, fontColor ])
	useEffect(() => { setLeva({ optionalText: optionalText }) }, [ setLeva, optionalText ])

	return (
		<Leva
			//theme={myTheme} // you can pass a custom theme (see the styling section)
			fill={false} // default = false, true makes the pane fill the parent dom node it's rendered in
			flat={false} // default = false, true removes border radius and shadow
			oneLineLabels={false} // default = false, alternative layout for labels, with labels and fields on separate rows
			titleBar={false}
			hideCopyButton={true}
		/>
	)
}

export { LevaCtrl }
