export default (store, hideXsNav ) => ({
  path: 'signup',
  onEnter: hideXsNav,    
  getComponent(nextState, cb) {
    require.ensure([], function(require) {
      cb(null, require('../../components/SignupPage').default);
    });
  },
});
