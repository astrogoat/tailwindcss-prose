# Tailwind CSS plugin for Strata's Prose editor
Tailwind CSS plugin to help generate Strata's prose editor classes.

## Usage
Add the plugin to your list of Tailwind CSS plugins.
```js
module.exports = {
    plugins: [
        // ...
        require('@astrogoat/tailwindcss-prose')
    ],
}
```

### Purging classes
If you're purging classes make sure to add the generated classes to you safelist. By default, all Strata Prose editor classes are prefixed with `strata-prose-` by default.

```js
module.exports = {
    plugins: [
        // ...
        require('@astrogoat/tailwindcss-prose')
    ],
    safelist: [
        { pattern: /strata-prose-/ },
    ],
}
```

### Exposing options
Most of the time it you want the editor to have your own set of classes as defined in your Strata 
PHP config file. In order for those classes to be generated correctly based on your Tailwind 
configuration we need to tell the plugin about which styles you want it to generate 

To do this we invoke the plugin with a configuration object where you can  define the prefix and the styles.

If you don't provide a set of options for a style your full Tailwind theme config while be used instead. I.e. if you don't provide a set of options for `textColor`, all available colors from your Tailwind config will be generated. Warning, this can make your stylesheet file unnecessary big, so it's always a good idea to limit the number of colors to be available.

```js
module.exports = {
    plugins: [
        // ...
        require('@astrogoat/tailwindcss-prose')({
            prefix: 'my-editor',
            styles: {
                textColor: {
                    prefix: 'my-text-color',
                    options: [
                        'evergreen',
                        'sand',
                        'sprout',
                    ],
                },
                backgroundColor: {
                    options: [
                        'evergreen',
                        'sand',
                        'sprout',
                    ],
                }
            }
        })
    ],
    safelist: [
        { pattern: /my-editor-/ },
    ],
}
```
This will produce something like so:
```css
.my-editor-my-text-color-evergreen{
    background-color: #00513E;
}
.my-editor-my-text-color-sand{
    background-color: #D4C4BA;
}
.my-editor-my-text-color-sprout{
    background-color: #158F48;
}
.my-editor-background-color-sprout{
    background-color: #158F48;
}
.my-editor-background-color-evergreen{
    background-color: #00513E;
}
.my-editor-background-color-sand{
    background-color: #D4C4BA;
}
.my-editor-text-size-xs{
    font-size: 0.75rem;
}
.my-editor-text-size-sm{
    font-size: 0.875rem;
}
/* ... and so on ... */
```

## Options
These are the style options that are exposed to be customized. All have an option to define the prefix for the style and the options that it should limit/generate.

### Text color
```js
module.exports = {
    styles: {
        textColor: {
            prefix: 'text-color',
            options: [
                // ...
            ],
        },
    }
}
```

### Background color
```js
module.exports = {
    styles: {
        backgroundColor: {
            prefix: 'background-color',
            options: [
                // ...
            ],
        },
    }
}
```

### Text size
```js
module.exports = {
    styles: {
        textSize: {
            prefix: 'text-size',
            options: [
                // ...
            ],
        },
    }
}
```

### Font family
```js
module.exports = {
    styles: {
        fontFamily: {
            prefix: 'font-family',
            options: [
                // ...
            ],
        },
    }
}
```

### Text align
```js
module.exports = {
    styles: {
        textAlign: {
            prefix: 'text-align',
            options: [
                // ...
            ],
        },
    }
}
```

### Text indent
```js
module.exports = {
    styles: {
        textIndent: {
            prefix: 'text-indent',
            options: [
                // ...
            ],
        },
    }
}
```
