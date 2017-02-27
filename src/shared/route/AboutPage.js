export default (store, hideXsNav) => ({
  path: 'aboutus',
  onEnter: hideXsNav,    
  authorize: ['reAuth'],  
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/AboutPage').default);
    });
  },
});
