# choo-location-electron

A [choo](https://github.com/yoshuawuyts/choo) subscription that fixes routing in electron when loading a url from disk.

[![Build Status](https://travis-ci.org/hypermodules/choo-location-electron.svg?branch=master)](https://travis-ci.org/hypermodules/choo-location-electron)

**WARNING: Doesn't work with choo 4 right now**

See:

- https://github.com/hypermodules/hyperamp/issues/68
- https://github.com/yoshuawuyts/sheet-router/issues/72

### Why?

When creating an electron browser window and loading the view from disk, `choo`'s router doesn't work out of the box due to the format of the resulting `file://` url.  `choo-location-electron` provides a subscription that properly processes urls in `href` attributes of `a` tags so that they work with [sheet-router](https://github.com/yoshuawuyts/sheet-router) properly.

### Example

```js
const choo = require('choo')
const location = require('choo-location-electron')({ openExternal: true })
const app = choo()
app.model(location)

// rest of your app

const tree = app.start({ href: false }) //REQUIRED SETTINGS
document.body.appendChild(tree)
```

Note: Setting `href: false` is required in order to properly intercept click events on links.

### API

#### `var location = require('choo-location-electron')([opts])`

Return a choo subscription that properly handles internal and optionally external links in electron.

Default options:

```js
{
  openExternal: false
}
```

- `openExternal` (Optional Boolean): intercept URLs and open them in a web browser using `require('electron').shell.openExternal` (see [electron.atom.io/docs/api/shell/#shellopenexternalurl-options](http://electron.atom.io/docs/api/shell/#shellopenexternalurl-options)).

## See also

- [sethvincent/adventuretron/app/models/location.js](https://github.com/sethvincent/adventuretron/blob/c09a20cffb09650ce11f0195c150aaba13a9f45b/app/models/location.js#L25)
