const plugin = require("tailwindcss/plugin");
const _ = require("lodash");
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette")

module.exports = plugin.withOptions(function (options = {}) {
    return function ({ addUtilities, matchUtilities, theme, config }) {
        let prefix = options.prefix || 'strata-'
        let styles = _.merge({
            textColor: {
                prefix: options.styles?.textColor?.prefix || 'text-color',
                options: options.styles?.backgroundColor?.options || Object.keys(flattenColorPalette(theme('colors')))
            },
            textSize: {
                prefix: options.styles?.textSize?.prefix || 'text-size',
                options: options.styles?.textSize?.options || Object.keys(theme('fontSize'))
            },
            backgroundColor: {
                prefix: options.styles?.backgroundColor?.prefix || 'background-color',
                options: options.styles?.backgroundColor?.options || Object.keys(flattenColorPalette(theme('colors')))
            },
            fontFamily: {
                prefix: options.styles?.fontFamily?.prefix || 'font-family',
                options: options.styles?.fontFamily?.options || Object.keys(theme('fontFamily'))
            },
            textAlign: {
                prefix: options.styles?.textAlign?.prefix || 'text-align',
                options: options.styles?.textAlign?.options || ['left', 'center', 'right', 'justify'],
            },
            textIndent: {
                prefix: options.styles?.textIndent?.prefix || 'text-indent',
                options: options.styles?.textIndent?.options || Object.keys(theme('spacing')),
            },
        }, options.styles || {})

        for (let type in styles) {
            let defaultClassName = type.replace(/([a-z0–9])([A-Z])/g, "$1-$2").toLowerCase();
            let classNamePrefix = `${prefix}${styles[type].prefix || defaultClassName}`
            let values = {}

            styles[type].options.forEach((option) => {
                values[option] = option
            })

            switch (type) {
                case 'textColor':
                    let allowedTextColors = _.isArray(styles.textColor.options)
                        ? styles.textColor.options
                        : Object.keys(styles.textColor.options)

                    allowedTextColors.forEach((colorName) => {
                        addUtilities({
                            [`.${classNamePrefix}-${colorName.replaceAll('-', '_')}`]: {
                                'color': flattenColorPalette(theme('colors'))[colorName]
                            }
                        })
                    })

                    break
                case 'textSize':
                    matchUtilities({
                            [classNamePrefix]: (value) => ({
                                'font-size': theme(`fontSize.${value}`)
                            }),
                        },
                        { values: values }
                    )

                    break;
                case 'backgroundColor':
                    let allowedBackgroundColors = _.isArray(styles.backgroundColor.options)
                        ? styles.backgroundColor.options
                        : Object.keys(styles.backgroundColor.options)

                    allowedBackgroundColors.forEach((colorName) => {
                        addUtilities({
                            [`.${classNamePrefix}-${colorName.replaceAll('-', '_')}`]: {
                                'background-color': flattenColorPalette(theme('colors'))[colorName]
                            }
                        })
                    })

                    break;
                case 'fontFamily':
                    matchUtilities({
                            [classNamePrefix]: (value) => ({
                                'font-family': theme(`fontFamily.${value}`)
                            }),
                        },
                        { values: values }
                    )
                    break;

                case 'textAlign':
                    matchUtilities({
                            [classNamePrefix]: (value) => ({
                                'text-align': value
                            }),
                        },
                        { values: values }
                    )
                    break;

                case 'textIndent':
                    matchUtilities({
                            [classNamePrefix]: (value) => ({
                                'text-indent': theme(`spacing.${value}`)
                            }),
                        },
                        { values: values }
                    )
                    break;
            }
        }
    }
})
