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

const routes = [
  { path: '/',
    exact: true,
	level: 1,
    component: HomePage,
	authorize: ['reAuth'], 
  },
  { path: '/home',
    component: HomePage,
	exact: true,
	level: 1,
	authorize: ['reAuth'], 
  },
  { path: '/signup',
    exact: true,
	level: 1,
    component: SignupPage,
  },
  { path: '/signin',
    exact: true,
	level: 1,
    component: SigninPage,
  },
  { path: '/user',
    component: UserPage,
	level: 1,
	authorize: ['normal'],
	exact: true,
  },
  { path: '/aboutus',
	level: 1,
    component: AboutPage,
	authorize: ['reAuth'],
	exact: true,
  },
  { path: '/contact',
    authorize: ['reAuth'],
	exact: true,
	level: 1,
    component: ContactPage,
  },
  { path: '/products/:product/:ProductsTbl',
    authorize: ['reAuth'],
	level: 1,
    component: ProductsPage,
  },
  { path: '/products/:product',
    authorize: ['reAuth'],
	exact: true,
	level: 1,
    component: ProductsPage,
  },
  { path: '/admin',
    authorize: ['normal','admin'],
	level: 1,
    component: AdminPage,
  },
  { path: '/unauthorized',
    level: 1,
    exact: true,
    component: UnauthorizedPage,
  },

]

export default routes;
