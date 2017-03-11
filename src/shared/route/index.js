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
  },
  { path: '/home',
    component: HomePage,
	exact: true,
	authorize: ['reAuth'], 
  },
  { path: '/signup',
    exact: true,
    component: SignupPage,
  },
  { path: '/signin',
    exact: true,
    component: SigninPage,
  },
  { path: '/user',
    component: UserPage,
	authorize: ['normal'],
	exact: true,
  },
  { path: '/aboutus',
    component: AboutPage,
	authorize: ['reAuth'],
	exact: true,
  },
  { path: '/contact',
    authorize: ['reAuth'],
	exact: true,
    component: ContactPage,
  },
  { path: '/products/:product',
    authorize: ['reAuth'],
    component: ProductsPage,
	routes: [
      { path: '/products/:product/:ProductsTbl',
		exact: true,
        component: ProductsTblPage
      },
      { path: '/products/:product/spec/:id',
		exact: true,	  
        component: DetailsPage
      }
    ]
  },
  { path: '/admin',
    authorize: ['normal','admin'],
    component: AdminPage,
	routes: [
      { path: '/admin/productChange/:id',
		exact: true,
        component: AdminEditProductPage
      },
      { path: '/admin/productList/:cat',
		exact: true,	  
        component: AdminListProductPage
      },
      { path: '/admin/addUser',
		exact: true,	  
        component: AddUserPage
      }
    ]	
  },
  { path: '/unauthorized',
    level: 1,
    exact: true,
    component: UnauthorizedPage,
  },

]

export default routes;
