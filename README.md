# choo-location-electron

A choo subscription that fixes routing in electron when loading a url from disk.

### Why?

When creating an electron browser window and loading the view from disk, `choo`'s router doesn't work out of the box due to the format of the resulting `file://` url format.  `choo-location-electron` provides a subscription that properly processes urls in `href` attributes of `a` tags so that they work with [sheet-router](https://github.com/yoshuawuyts/sheet-router) properly.

### Example

```js
const choo = require('choo')
const location = require('choo-location-electron')
const app = choo()
app.model(location)

// rest of your app

const tree = app.start({ href: false }) //REQUIRED SETTINGS
document.body.appendChild(tree)
```

Note: Setting `href: false` is required in order to properly intercept click events on links.

## See also

- [sethvincent/adventuretron/app/models/location.js](https://github.com/sethvincent/adventuretron/blob/c09a20cffb09650ce11f0195c150aaba13a9f45b/app/models/location.js#L25)
