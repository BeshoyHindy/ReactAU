export default (store, hideXsNav) => ({
  path: 'home',
  onEnter: hideXsNav,    
  authorize: ['reAuth'],
  getComponent(nextState, cb) {
    require.ensure([], function(require) {
      cb(null, require('../../components/HomePage').default);
    });
  },
});


