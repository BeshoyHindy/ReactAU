export default (store, hideXsNav) => ({
  path: '*',
  getComponent(nextState, cb) {
    require.ensure([], function(require) {
      cb(null, require('../components/NotFoundPage').default);
    });
  },
});
