import { Font } from './index'

export const sansFonts: string [] = [
	"Lato",
	"Noto Sans JP",
	"Noto Sans",
	"Open Sans",
	"PT Sans",
	"Raleway",
	"Robota",
	"Ubuntu",
] 

export default sansFonts.sort().map<Font>(f => {return { family: f, fallback: "sans-serif" }})