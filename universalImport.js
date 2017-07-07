/* eslint-disable */

module.exports = function(config, makeThennable) {
  if (makeThennable === false) return config

  var load = config.load
  config.then = cb =>
    load().then(function(res) {
      cb && cb(res)
    })
  config.catch = cb =>
    load().catch(function(e) {
      e => cb && cb(e)
    })
  return config
}

var isSet = false

function setHasPlugin() {
  if (isSet) return
  var universal
  var isWebpack = typeof __webpack_require__ !== 'undefined'

  try {
    if (isWebpack) {
      var weakId = require.resolveWeak('react-universal-component')
      universal = __webpack_require__(weakId)
    } else {
      var pkg = 'react-universal-component'
      universal = module.require(pkg)
    }

    if (universal) {
      universal.setHasBabelPlugin()
      isSet = true
    }
  } catch (e) {}
}

setHasPlugin()
