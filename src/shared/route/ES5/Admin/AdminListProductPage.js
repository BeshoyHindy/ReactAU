export default (store, hideXsNav) => ({
  path: 'productList/:cat',
  onEnter: hideXsNav,    
  getComponent(nextState, cb) {
    require.ensure([], function(require) {
      cb(null, require('../../../components/Admin/AdminListProductPage').default);
    });
  },
});
