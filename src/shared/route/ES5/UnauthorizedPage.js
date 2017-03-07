export default (store, hideXsNav) => ({
  path: 'unauthorized',
  getComponent(nextState, cb) {
    require.ensure([], function(require) {
      cb(null, require('../../components/UnauthorizedPage').default);
    });
  },
});
