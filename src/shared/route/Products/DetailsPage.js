export default (store, hideXsNav) => ({
  path: 'spec/:id',
  onEnter: hideXsNav,    
  getComponent(nextState, cb) {
    require.ensure( [], function(require) {
      cb(null, require('../../components/Products/DetailsPage').default);
    });
  },
});
