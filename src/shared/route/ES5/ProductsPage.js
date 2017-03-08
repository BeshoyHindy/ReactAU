import ProductsPage from '../../components/ProductsPage';

export default (store, hideXsNav) => ({
  path: 'products',
  component: ProductsPage,
  authorize: ['reAuth'],
  getChildRoutes(location, cb) {
    require.ensure([], function(require) {
      cb(null, [
        require('./Products/Product').default(store, hideXsNav),
      ]);
    });
  },
});
