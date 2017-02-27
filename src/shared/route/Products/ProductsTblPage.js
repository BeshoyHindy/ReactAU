export default (store, hideXsNav) => ({
  path: ':ProductsTbl',
  onEnter: hideXsNav,    
  getComponent(nextState, cb) {
    require.ensure([], function(require) {
      cb(null, require('../../components/Products/ProductsTblPage').default);
    });
  },
});
