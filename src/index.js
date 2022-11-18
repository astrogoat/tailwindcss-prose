const plugin = require("tailwindcss/plugin");
const lodash = require("lodash");

module.exports = plugin.withOptions(function (options = {}) {
    return function({ matchUtilities, theme }) {
        let prefix = options.prefix || 'prose'
        let styles = lodash.merge({
            'text-color': ['black', 'white'],
            'text-size': ['xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
            'font-family': ['sans', 'serif'],
            'background-color': ['black', 'white'],
            'text-align': ['left', 'center', 'right', 'justify'],
            'text-indent': ['1', '2', '3', '4', '5', '6'],
        }, options.styles || {})

        for (let type in styles) {
            let values = {}
            // Convert to kebab case.
            type = type.replace(/([a-z0–9])([A-Z])/g, "$1-$2").toLowerCase();

            styles[type].forEach((option) => {
                values[option] = option
            })

            switch (type) {
                case 'text-color':
                    matchUtilities({
                            [`${prefix}-${type}`]: (value) => ({
                                'color': theme(`colors.${value}`)
                            }),
                        },
                        { values: values }
                    )
                    break;
                case 'text-size':
                    matchUtilities({
                            [`${prefix}-${type}`]: (value) => ({
                                'font-size': theme(`fontSize.${value}`)
                            }),
                        },
                        { values: values }
                    )
                    break;

                case 'background-color':
                    matchUtilities({
                            [`${prefix}-${type}`]: (value) => ({
                                'background-color': theme(`colors.${value}`)
                            }),
                        },
                        { values: values }
                    )
                    break;

                case 'font-family':
                    matchUtilities({
                            [`${prefix}-${type}`]: (value) => ({
                                'font-family': theme(`fontFamily.${value}`)
                            }),
                        },
                        { values: values }
                    )
                    break;

                case 'text-align':
                    matchUtilities({
                            [`${prefix}-${type}`]: (value) => ({
                                'text-align': value
                            }),
                        },
                        { values: values }
                    )
                    break;

                case 'text-indent':
                    matchUtilities({
                            [`${prefix}-${type}`]: (value) => ({
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
