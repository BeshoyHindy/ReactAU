import { getDevice } from '../actions/deviceAction';
import { loadCategories } from '../actions/adminActions';
import {loadDetails} from '../actions/detailsActions';
import {loadProducts, loadProductList} from '../actions/productsActions';

import HomePage from '../components/HomePage';
import SignupPage from '../components/SignupPage';
import SigninPage from '../components/SigninPage';
import UserPage from '../components/UserPage';
import AboutPage from '../components/AboutPage';
import ContactPage from '../components/ContactPage';
import ProductsPage from '../components/ProductsPage';
import AdminPage from '../components/AdminPage';
import NotFoundPage from '../components/NotFoundPage';
import UnauthorizedPage from '../components/UnauthorizedPage';
import ProductsTblPage from '../components/Products/ProductsTblPage';
import DetailsPage from '../components/Products/DetailsPage';
import AdminEditProductPage from '../components/Admin/AdminEditProductPage';
import AdminListProductPage from '../components/Admin/AdminListProductPage';
import AddUserPage from '../components/Admin/AddUserPage';

const routes = [
  { path: '/',
    exact: true,
    component: HomePage,
	authorize: ['reAuth'], 
	actions: []	
  },
  { path: '/home',
    component: HomePage,
	exact: true,
	authorize: ['reAuth'], 
	actions: []	
  },
  { path: '/signup',
    exact: true,
    component: SignupPage,
	actions: []	
  },
  { path: '/signin',
    exact: true,
    component: SigninPage,
	actions: []	
  },
  { path: '/user',
    component: UserPage,
	authorize: ['normal'],
	exact: true,
	actions: []	
  },
  { path: '/aboutus',
    component: AboutPage,
	authorize: ['reAuth'],
	exact: true,
	actions: []	
  },
  { path: '/contact',
    authorize: ['reAuth'],
	exact: true,
    component: ContactPage,
	actions: []	
  },
  { path: '/products',
    authorize: ['reAuth'],
    component: ProductsPage,
	actions: [loadProducts ], 
	routes: [
      { path: '/products/:product/:ProductsTbl',
		exact: true,
        component: ProductsTblPage,
		actions: [loadProducts]	
      },
      { path: '/products',
		exact: true,
        component: ProductsTblPage,
		actions: [loadProducts]	
      },
      { path: '/products/:product/spec/:id',
		exact: true,	  
        component: DetailsPage,
		actions: [loadDetails]
      }
    ]
  },
  { path: '/admin',
    authorize: ['normal','admin'],
    component: AdminPage,
	routes: [
      { path: '/admin/productChange/0',
		exact: true,
        component: AdminEditProductPage,
		actions: [loadDetails]
      },
      { path: '/admin/productChange/:id',
		exact: true,
        component: AdminEditProductPage,
		actions: [loadDetails]
      },
      { path: '/admin/productList/:cat',
		exact: true,	  
        component: AdminListProductPage,
		actions: [loadProductList ], 
      },
      { path: '/admin/addUser',
		exact: true,	  
        component: AddUserPage,
		actions: []	
      }
    ]	
  },
  { path: '/unauthorized',
    level: 1,
    exact: true,
    component: UnauthorizedPage,
	actions: []	
  },

]

export default routes;
