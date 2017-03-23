if (process.env.BROWSER && process.env.NODE_ENV !== 'development') {
	//disable code spliting on development(due to react hot loader 3 not support dynamic import code spliting)
    module.exports = require('./lazyRoute').default;
} else {
    module.exports = require('./staticRoute').default;
}
