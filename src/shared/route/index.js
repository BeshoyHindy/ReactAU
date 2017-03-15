if (process.env.BROWSER) {
    module.exports = require('./lazyRoute').default;
} else {
    module.exports = require('./staticRoute').default;
}
