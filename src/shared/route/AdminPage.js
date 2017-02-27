import AdminPage from '../components/AdminPage';

export default (store, hideXsNav) => ({
  path: 'admin',
  component: AdminPage,
  authorize: ['normal','admin'],
  getChildRoutes(location, cb) {
    require.ensure([], function(require) {
      cb(null, [
        require('./Admin/AdminEditProductPage').default(store, hideXsNav),
        require('./Admin/AdminListProductPage').default(store, hideXsNav),
        require('./Admin/AddUserPage').default(store, hideXsNav),
      ]);
    });
  },
});
