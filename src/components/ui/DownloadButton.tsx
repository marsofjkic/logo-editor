import * as React from "react"
import classnames from "classnames"
import { UIStore } from "../../stores/UIStore"
import { generateUrlForFonts } from "../../engine/googleFonts"

const DownloadButton: React.FunctionComponent<{ className?: string }> = (props: {
    className?: string
}) => {
    const font = UIStore.useState((s) => s.title.style.fontFamily)

    // const downloadSVGasPNG = () => {
    //     const svg = document.querySelector("#logo-image")?.childNodes[0]

    //     if (!svg) {
    //         return
    //     }
    //     const xml = new XMLSerializer().serializeToString(svg)
    //     const svg64 = btoa(xml)
    //     const image = "data:image/svg+xml;base64," + svg64
    //     const element = document.createElement("a")

    //     const sourceImage = new Image()

    //     sourceImage.onload = () => {
    //         console.log("Load")
    //         const canvas = document.createElement("canvas")
    //         canvas.height = 280
    //         canvas.width = 300

    //         const ctx = canvas.getContext("2d")

    //         ctx?.drawImage(sourceImage, 0, 0, 280, 300)

    //         element.download = "logo.png"
    //         element.href = canvas.toDataURL("image/png")
    //         element.click()
    //         element.remove()
    //     }

    //     sourceImage.src = image
    // }

    const downloadSVG = () => {
        const node = document.querySelector("#image-logo")

        if (!node) {
            return
        }
        const style = document.createElement("style")
        style.innerHTML = `
            @font-face {
                font-family: ${font};
                src: url("${generateUrlForFonts([font])}");
            }
        `
        node.firstChild?.appendChild(style)

        const svg = node.innerHTML

        const blob = new Blob([svg.toString()])
        const element = document.createElement("a")
        element.download = "logo.svg"
        element.href = window.URL.createObjectURL(blob)
        element.click()
        element.remove()
    }

    return (
        <div className={classnames("download-button", props?.className)}>
            <button onClick={() => downloadSVG()}>
                <svg
                    className="fill-current w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
                <span>Download</span>
            </button>
            {/* <button
                className="m-2 box-content max-content bg-transparent bg-orange-600 font-semibold text-white py-2 px-4 rounded"
                onClick={() => downloadSVGasPNG()}
            >
                Download as PNG
            </button> */}
        </div>
    )
}

export default DownloadButton
