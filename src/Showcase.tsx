import * as React from "react"
import { Link } from "react-router-dom"
import logos from "./assets/logos"
import CreateLogo from "./components/CreateLogo"
import UIStore from "./stores/LogoModel"
import ColorScheme from "color-scheme"
import { presets } from "./assets/fonts/fonts"
import { AssetsStore } from "./stores/AssetsStore"

const Showcase: React.FunctionComponent<unknown> = () => {
    const store = UIStore.useState((s) => s)
    const fontsStore = AssetsStore.useState((s) => s)

    const [colors, setColors] = React.useState<string[]>([])
    const [fontsList, setFontsList] = React.useState<{ title: string; slogan: string }[]>([])

    React.useEffect(() => {
        // Generate the colors
        const generateColors = () => {
            const scm = new ColorScheme()
            const colorsNum = new Set()

            const step = 360 / logos.length
            for (let i = 0; i < logos.length; ++i) {
                colorsNum.add(step * i)
            }

            const colors: string[] = []
            colorsNum.forEach((x) => {
                scm.from_hue(x).scheme("triade").distance(0.8).variation("hard").web_safe(true)

                colors.push("#" + scm.colors()[1])
            })

            return colors
        }
        setColors(generateColors())

        const generateFonts = () => {
            const list = []

            let index = 0
            while (list.length < logos.length) {
                list.push(presets[index])
                index++
                if (index >= presets.length) {
                    index = 0
                }
            }

            return list
        }

        setFontsList(generateFonts())
    }, [])

    const renderLogoList = () => {
        const setOptions = (index: number) => {
            UIStore.update((s) => {
                s.logo.src = logos[index]
                s.container.style.color = colors[index]
                s.title.style.fontFamily = fontsList[index].title
                s.slogan.style.fontFamily = fontsList[index].slogan
            })
        }

        if (!fontsList.length || !colors.length || fontsStore.areFontsLoaded !== "active") {
            console.log(fontsList.length, colors.length, fontsStore.areFontsLoaded)
            return
        } else {
            console.log(fontsList)
        }

        return logos.map((logoSRC, index) => {
            return (
                <button
                    className="hover:border-2 hover:border-blue-600"
                    key={logoSRC.id}
                    onClick={(e) => {
                        e.preventDefault()
                        setOptions(index)
                    }}
                >
                    <CreateLogo
                        logoProps={{
                            ...store,
                            container: {
                                ...store.container,
                                width: 300,
                                height: 250,
                                viewbox: {
                                    x: 0,
                                    y: 0,
                                    width: 300,
                                    height: 250,
                                },
                                style: {
                                    color: colors[index],
                                },
                            },
                            logo: {
                                ...store.logo,
                                src: logoSRC,
                            },
                            title: {
                                ...store.title,
                                style: {
                                    ...store.title.style,
                                    fontFamily: fontsList[index].title,
                                },
                            },
                            slogan: {
                                ...store.slogan,
                                style: {
                                    ...store.slogan.style,
                                    fontFamily: fontsList[index].slogan,
                                },
                            },
                        }}
                    />
                </button>
            )
        })
    }

    return (
        <div className="static flex flex-col items-center">
            <div>
                <Link
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-4 py-2 px-4 rounded"
                    to="/start"
                >
                    Back
                </Link>
            </div>
            <div className="m-4 lg:w-4/5">
                <div className="flex flex-col bg-orange-200 my-4">
                    <h1 className="text-2xl md:text-4xl font-bold text-center">
                        Choose from any of the logo templates
                    </h1>
                    <p className="text-sm md:text-xl font-bold text-center">
                        You can change this information after your designs have been created
                    </p>
                </div>
                <div>
                    <div className="flex flex-col items-center justify-center text-white bg-gradient-to-br from-gray-600 via-teal-700 to-gray-800">
                        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
                            {renderLogoList()}
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center absolute sticky bottom-0 bg-white">
                <Link
                    className=" block w-4/5 lg:w-1/5 my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
                    to="/"
                >
                    Next
                </Link>
            </div>
        </div>
    )
}

export default Showcase
