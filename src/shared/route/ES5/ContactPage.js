export default (store, hideXsNav) => ({
  path: 'contact',
  onEnter: hideXsNav,  
  authorize: ['reAuth'],  
  getComponent(nextState, cb) {
    require.ensure([], function(require) {
      cb(null, require('../../components/ContactPage').default);
    });
  },
});
