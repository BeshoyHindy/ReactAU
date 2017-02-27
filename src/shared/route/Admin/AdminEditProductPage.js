export default (store, hideXsNav) => ({
  path: 'productChange/:id',
  onEnter: hideXsNav,    
  getComponent(nextState, cb) {
    require.ensure([], function(require) {
      cb(null, require('../../components/Admin/AdminEditProductPage').default);
    });
  },
});
