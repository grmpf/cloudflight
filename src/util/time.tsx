function timeNow(showSeconds = false) {
	const d = new Date()
	const hTmp = d.getHours()
	const mTmp = d.getMinutes()
	const h = (hTmp < 10 ? '0' : '') + hTmp
	const m = (mTmp < 10 ? '0' : '') + mTmp
	if(showSeconds) {
		const sTmp = d.getSeconds()
		const s = (sTmp < 10 ? '0' : '') + sTmp
		return h + ':' + m + ':' + s
	} else {
		// seconds could be used to calc the offset and sync updates with the real time
		return h + ':' + m
	}
}

function timeNow2(showSeconds = false, hour12 = false, locale = undefined) {
	const options: Intl.DateTimeFormatOptions = {
		hour: '2-digit',
		minute: '2-digit',
		hour12: hour12,
	}
	if (showSeconds) {
		options['second'] = '2-digit'
	}
	return new Date().toLocaleTimeString(locale, options) // undefined locale is perfectly fine
}


export {
	timeNow, timeNow2
}
