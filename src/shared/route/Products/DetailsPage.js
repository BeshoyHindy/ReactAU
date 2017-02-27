export default (store, hideXsNav) => ({
  path: 'spec/:id',
  onEnter: hideXsNav,    
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../components/Products/DetailsPage').default);
    });
  },
});
