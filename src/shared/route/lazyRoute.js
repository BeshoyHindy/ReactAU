import { getDevice } from '../actions/deviceAction';
import { loadCategories } from '../actions/adminActions';
import {loadDetails} from '../actions/detailsActions';
import {loadProducts, loadProductList} from '../actions/productsActions';


const routes = [
  { path: '/',
    exact: true,
    componentPath: 'HomePage',
	authorize: ['reAuth'], 
	actions: []	
  },
  { path: '/home',
    componentPath: 'HomePage',
	exact: true,
	authorize: ['reAuth'], 
	actions: []	
  },
  { path: '/signup',
    exact: true,
    componentPath: 'SignupPage',
	actions: []	
  },
  { path: '/signin',
    exact: true,
    componentPath: 'SigninPage',
	actions: []	
  },
  { path: '/user',
    componentPath: 'UserPage',
	authorize: ['normal'],
	exact: true,
	actions: []	
  },
  { path: '/aboutus',
    componentPath: 'AboutPage',
	authorize: ['reAuth'],
	exact: true,
	actions: []	
  },
  { path: '/contact',
    authorize: ['reAuth'],
	exact: true,
    componentPath: 'ContactPage',
	actions: []	
  },
  { path: '/products',
    authorize: ['reAuth'],
    componentPath: 'ProductsPage',
	actions: [loadProducts ], 
	routes: [
      { path: '/products/:product/:ProductsTbl',
		exact: true,
        componentPath: 'Products/ProductsTblPage',
		actions: [loadProducts]	
      },		
      { path: '/products',
		exact: true,
        componentPath: 'Products/ProductsTblPage',
		actions: [loadProducts]	
      },
      { path: '/products/:product/spec/:id',
		exact: true,	  
        componentPath: 'Products/DetailsPage',
		actions: [loadDetails]
      }
    ]
  },
  { path: '/admin',
    authorize: ['normal','admin'],
    componentPath: 'AdminPage',
	routes: [
      { path: '/admin',
		exact: true,
        componentPath: 'Admin/AdminEditProductPage',
		actions: [loadDetails]
      },
      { path: '/admin/productChange/:id',
		exact: true,
        componentPath: 'Admin/AdminEditProductPage',
		actions: [loadDetails]
      },
      { path: '/admin/productList/:cat',
		exact: true,	  
        componentPath: 'Admin/AdminListProductPage',
		actions: [loadProductList ], 
      },
      { path: '/admin/addUser',
		exact: true,	  
        componentPath: 'Admin/AddUserPage',
		actions: []	
      }
    ]	
  },
  { path: '/unauthorized',
    level: 1,
    exact: true,
    componentPath: 'UnauthorizedPage',
	actions: []	
  },

]

export default routes;
