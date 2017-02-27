export default (store, hideXsNav) => ({
  path: 'user',
  onEnter: hideXsNav,    
  getComponent(nextState, cb) {
    require.ensure([], function(require) {
      cb(null, require('../components/UserPage').default);
    });
  },
});
