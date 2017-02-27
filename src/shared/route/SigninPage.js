export default (store, hideXsNav ) => ({
  path: 'signin',
  onEnter: hideXsNav,    
  getComponent(nextState, cb) {
    require.ensure([], function(require) {
      cb(null, require('../components/SigninPage').default);
    });
  },
});
