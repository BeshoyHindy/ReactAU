import {ProductCategorySidebar} from '../../components/Products/Sidebar/CategorySidebar';
import {ProductCategory} from '../../components/Products/ProductCategory';

export default (store, hideXsNav) => ({
  path: ':product',
  onEnter: hideXsNav,    
  components: { content: ProductCategory, sidebar: ProductCategorySidebar },
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./DetailsPage').default(store, hideXsNav),
        require('./ProductsTblPage').default(store, hideXsNav),
      ]);
    });
  },
});

