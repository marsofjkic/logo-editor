import * as React from "react"
import Select from "react-select"
import { AssetsStore } from "../../stores/AssetsStore"
import UIStore from "../../stores/UIStore"

const SelectTypography: React.FunctionComponent<unknown> = () => {
    const fontOptions = AssetsStore.useState((s) => s.fonts.activeFonts).map((font) => ({
        value: font,
        label: font,
    }))

    const titleSizeOptions = [...Array(25).keys()]
        .map((size) => size + 38)
        .map((size) => ({
            value: size,
            label: size.toString(),
        }))

    const sloganSizeOptions = [...Array(25).keys()]
        .map((size) => size + 18)
        .map((size) => ({
            value: size,
            label: size.toString(),
        }))

    const onTitleTextChange = (value: string) => {
        UIStore.update((s) => {
            s.title.text = value
        })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onTitleFontFamilyChange = ({ value }: any) => {
        console.log(value)
        UIStore.update((s) => {
            s.title.style.fontFamily = value
        })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onTitleFontSizeChange = ({ value }: any) => {
        UIStore.update((s) => {
            s.title.style.fontSize = value
        })
    }

    const onSloganTextChange = (value: string) => {
        UIStore.update((s) => {
            s.slogan.text = value
        })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSloganFontFamilyChange = ({ value }: any) => {
        UIStore.update((s) => {
            s.slogan.style.fontFamily = value
        })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSloganFontSizeChange = ({ value }: any) => {
        UIStore.update((s) => {
            s.slogan.style.fontSize = value
        })
    }

    const defaultTitleFontFamily = UIStore.useState((s) => s.title.style.fontFamily)
    const defaultTitleFontSize = UIStore.useState((s) => s.title.style.fontSize)

    const defaultSloganFontFamily = UIStore.useState((s) => s.slogan.style.fontFamily)
    const defaultSloganFontSize = UIStore.useState((s) => s.slogan.style.fontSize)

    return (
        <div className="select-typography">
            <div className="title-options">
                <h1>LOGO</h1>
                <label htmlFor="select-title-text">Title</label>
                <input
                    value={UIStore.useState((s) => s.title.text)}
                    onChange={(e) => onTitleTextChange(e.target.value)}
                />
                <label htmlFor="select-title-font-family">Font Family</label>
                <Select
                    id="select-title-font-family"
                    defaultValue={fontOptions.filter(
                        ({ value }) => value === defaultTitleFontFamily
                    )}
                    onChange={onTitleFontFamilyChange}
                    options={fontOptions}
                />
                <label htmlFor="select-title-font-size">Font Size</label>
                <Select
                    id="select-title-font-size"
                    defaultValue={titleSizeOptions.filter(
                        ({ value }) => value === defaultTitleFontSize
                    )}
                    options={titleSizeOptions}
                    onChange={onTitleFontSizeChange}
                />
            </div>
            <div className="slogan-options">
                <h1>SLOGAN</h1>
                <label htmlFor="select-slogan-text">Slogan</label>
                <input
                    value={UIStore.useState((s) => s.slogan.text)}
                    onChange={(e) => onSloganTextChange(e.target.value)}
                />
                <label htmlFor="select-slogan-font-family">Font Family</label>
                <Select
                    id="select-slogan-font-family"
                    defaultValue={fontOptions.filter(
                        ({ value }) => value === defaultSloganFontFamily
                    )}
                    onChange={onSloganFontFamilyChange}
                    options={fontOptions}
                />
                <label htmlFor="select-slogan-font-size">Font Size</label>
                <Select
                    id="select-slogan-font-size"
                    defaultValue={sloganSizeOptions.filter(
                        ({ value }) => value === defaultSloganFontSize
                    )}
                    options={sloganSizeOptions}
                    onChange={onSloganFontSizeChange}
                />
            </div>
        </div>
    )
}

export default SelectTypography
