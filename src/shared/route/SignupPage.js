export default (store, hideXsNav ) => ({
  path: 'signup',
  onEnter: hideXsNav,    
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/SignupPage').default);
    });
  },
});
