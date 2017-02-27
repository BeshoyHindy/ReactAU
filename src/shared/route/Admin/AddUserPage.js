export default (store, hideXsNav) => ({
  path: 'addUser',
  onEnter: hideXsNav,    
  getComponent(nextState, cb) {
    require.ensure([], function(require) {
      cb(null, require('../../components/Admin/AddUserPage').default);
    });
  },
});
