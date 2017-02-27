export default (store, hideXsNav) => ({
  path: '*',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/NotFoundPage').default);
    });
  },
});
