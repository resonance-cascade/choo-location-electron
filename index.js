var shell = require('electron').shell

module.exports = function (options) {
  options = options || {}
  var openExternal = options.openExternal || false

  return {
    namespace: 'location',
    state: {
      pathname: '/'
    },
    reducers: {
      pathname: function (data, state) {
        return { pathname: data.pathname }
      }
    },
    subscriptions: [
      function catchLinks (send, done) {
        window.onclick = function (e) {
          var node = (function traverse (node) {
            if (!node) return
            if (node.localName !== 'a') return traverse(node.parentNode)
            if (node.href === undefined) return traverse(node.parentNode)
            return node
          })(e.target)

          if (!node || !node.href) return
          e.preventDefault()

          if (openExternal && node.href.indexOf('http') > -1) {
            return shell.openExternal(node.href)
          }

          var href = node.href.replace('file://', '')
          send('location:pathname', { pathname: href.replace(/#$/, '') }, done)
        }
      }
    ]
  }
}
