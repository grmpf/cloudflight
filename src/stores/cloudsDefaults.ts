const FONT_SIZE_FACTOR = 10
const LETTER_SPACING_FACTOR = 100
const LINE_HEIGHT_FACTOR = 100
const OUTLINE_WIDTH_FACTOR = 10

const cloudsDefaults = {
	typeToShow: 'text',
	showClock: true,
	showSeconds: false,
	fontSize: 3 * FONT_SIZE_FACTOR, //3
	fontFamily: 'https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff', //900
	//fontFamily: 'https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmYUtfBBc-.woff', //900
	letterSpacing: 0.02 * LETTER_SPACING_FACTOR, //0.02
	//letterSpacing: 0.0 * LETTER_SPACING_FACTOR,
	lineHeight: 1.0 * LINE_HEIGHT_FACTOR, //1.0
	//fontColor: 'cc3700',
	fontColor: 'ff9b06',
	optionalText: '',

	fontSizeFactor: FONT_SIZE_FACTOR,
	letterSpacingFactor: LETTER_SPACING_FACTOR,
	lineHeightFactor: LINE_HEIGHT_FACTOR,
	outlineWidthFactor: OUTLINE_WIDTH_FACTOR,
}

export { cloudsDefaults }
