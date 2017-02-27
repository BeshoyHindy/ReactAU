export default (store, hideXsNav) => ({
  path: 'user',
  onEnter: hideXsNav,    
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/UserPage').default);
    });
  },
});
