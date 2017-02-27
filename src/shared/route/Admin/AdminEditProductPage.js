export default (store, hideXsNav) => ({
  path: 'productChange/:id',
  onEnter: hideXsNav,    
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../components/Admin/AdminEditProductPage').default);
    });
  },
});
