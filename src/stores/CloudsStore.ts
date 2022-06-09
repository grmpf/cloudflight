/**
 * Store for the clouds page
 */

import create from 'zustand'
import { immer } from './middleware/immer'
import { cloudsDefaults } from './cloudsDefaults'
import { fonts } from './fonts'

type Store = {
	//debug: boolean;
	//toggleDebug(): void;

	// TEST
	canvasLoaded: boolean;
	setCanvasLoaded(bool: boolean): void;


	testMode: boolean;
	toggleTestMode(): void;
	setTestMode(bool: boolean): void;

	boostMode: boolean;
	toggleBoostMode(): void;
	setBoostMode(bool: boolean): void;

	slideInText: string;
	setSlideInText(value: string): void;
	resetSlideInText(): void;

	typeToShow: string,
	setTypeToShow(value: string): void,
	showSeconds: boolean,
	setShowSeconds(bool: boolean): void,
	fontSize: number,
	setFontSize(num: number): void,
	fontFamily: string,
	setFontFamily(url: string): void,
	letterSpacing: number,
	setLetterSpacing(num: number): void,
	lineHeight: number,
	setLineHeight(num: number): void,
	fontColor: string,
	setFontColor(hex: string): void
	optionalText: string,
	setOptionalText(text: string): void

	queryString: object,
	setQueryString(obj: object): void

	fonts: object,
	getFont(key: string): string
}

const cloudsStore = (state) => ({
	//debug: false,
	//toggleDebug: () => {
	//	state.debug = !state.debug;
	//},


	canvasLoaded: false,
	setCanvasLoaded: (bool) => {
		state.canvasLoaded = bool;
	},

	// could be used let a few ppl test some experimental features
	testMode: false,
	toggleTestMode: () => {
		state.testMode = !state.testMode;
	},
	setTestMode: (bool) => {
		//console.log(value, 'state.testMode 0')
		state.testMode = bool;
	},

	boostMode: false,
	toggleBoostMode: () => {
		state.boostMode = !state.boostMode;
	},
	setBoostMode: (bool) => {
		//console.log(value, 'state.boostMode 0')
		state.boostMode = bool;
	},


	slideInText: '',
	setSlideInText: (value) => {
		state.slideInText = value;
	},
	resetSlideInText: () => {
		state.slideInText = '';
	},




	//typeToShow: 'text',
	typeToShow: cloudsDefaults.typeToShow,
	setTypeToShow: (bool) => {
		state.typeToShow = bool;
	},
	//showSeconds: false,
	showSeconds: cloudsDefaults.showSeconds,
	setShowSeconds: (bool) => {
		state.showSeconds = bool;
	},
	//fontSize: 3,
	fontSize: cloudsDefaults.fontSize,
	setFontSize: (num) => {
		state.fontSize = num;
	},
	//fontFamily: 3,
	fontFamily: cloudsDefaults.fontFamily,
	setFontFamily: (url) => {
		state.fontFamily = url;
	},
	//letterSpacing: 0.02,
	letterSpacing: cloudsDefaults.letterSpacing,
	setLetterSpacing: (num) => {
		state.letterSpacing = num;
	},
	//lineHeight: 1.0,
	lineHeight: cloudsDefaults.lineHeight,
	setLineHeight: (num) => {
		state.lineHeight = num;
	},
	//fontColor: 'cc3700',
	//fontColor: 'ff9b06',
	fontColor: cloudsDefaults.fontColor,
	setFontColor: (hex) => {
		state.fontColor = hex;
	},
	//optionalText: '',
	optionalText: cloudsDefaults.optionalText,
	setOptionalText: (text) => {
		if(state.optionalText === text) {
			console.warn('setOptionalText() Leva BUG?:', state.optionalText, '=>', text)
		} else {
			console.warn('setOptionalText() OK:', state.optionalText, '=>', text)
		}
		state.optionalText = text;
	},


	//TEST ME
	queryString: {},
	setQueryString: (obj) => {
		state.queryString = obj;
	},


	fonts: fonts,
	getFont: (key) => {
		// just to get a nice getter - the font list is static
		if(key in state.fonts) {
			return state.fonts[key]
		}

		// fallback with first entry
		const fallbackFont = state.fonts[Object.keys(state.fonts)[0]]
		console.warn('getFont(): font "', key, '" not found. Using: ', fallbackFont)
		return fallbackFont
		//return null
	},
});

//export const [useCanvasStore, CanvasStore] = create(immer(canvasStore)); // < v4.0.0
export const useCloudsStore = create<Store>(immer(cloudsStore)); // >= v3.0.0
