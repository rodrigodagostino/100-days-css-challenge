const light = document.querySelector( '.light' )
const keys = document.querySelectorAll( '.key' )

const DOT_DURATION = 300
const INTRA_CHARACTER_SPACE = 1
const INTER_CHARACTER_SPACE = 3
const WORD_SPACE = 7

const CHARS = {
	a: '.-',
	b: '-...',
	c: '-.-.',
	d: '-..',
	e: '.',
	f: '..-.',
	g: '--.',
	h: '....',
	i: '..',
	j: '.---',
	k: '-.-',
	l: '.-..',
	m: '--',
	n: '-.',
	o: '---',
	p: '.--.',
	q: '--.-',
	r: '.-.',
	s: '...',
	t: '-',
	u: '..-',
	v: '...-',
	w: '.--',
	x: '-..-',
	y: '-.--',
	z: '--..',
	1: '.----',
	2: '..---',
	3: '...--',
	4: '....-',
	5: '.....',
	6: '-....',
	7: '--...',
	8: '---..',
	9: '----.',
	0: '-----',
	' ': '|',
}

const LENGTHS = {
	'.': 1,
	'-': 3,
	'|': 3,
}

const triggerMorseSignal = ( code ) => {
	const codeSegments = [ ...code ]
	let timeGap = 0
	codeSegments.forEach( segment => {
		let durationUnits
		for ( const key in LENGTHS ) {
			if ( segment === key ) {
				durationUnits = LENGTHS[key]
			}
		}
		setTimeout( () => {
			light.classList.add( 'is-active' )
			setTimeout( () => {
				light.classList.remove( 'is-active' )
			}, DOT_DURATION * durationUnits )
		}, timeGap )
		timeGap += ( DOT_DURATION * durationUnits ) + ( DOT_DURATION * INTRA_CHARACTER_SPACE )
	} )
}

// Trigger morse signal on click
keys.forEach( key => {
	key.addEventListener( 'click', () => {
		const keyData = key.dataset.key
		triggerMorseSignal( CHARS[keyData] )
	} )
} )

// Trigger morse signal on key press
window.addEventListener( 'keypress', ( e ) => {
	const keyPressed = e.key
	if ( CHARS[keyPressed] ) {
		triggerMorseSignal( CHARS[keyPressed] )
	}
} )
