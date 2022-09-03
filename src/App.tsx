import React, { useEffect } from 'react';
import styles from './App.module.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { NotFound } from './pages';
import { MainLayout, SignInUpLayout } from './layout';
import {
  FilteredProducts,
  Home,
  Product,
  SignIn,
  SignUp,
  ShoppinpCart,
  PlaceOrder,
} from './components';
import { useSelector } from './state/hooks';
import { useDispatch } from 'react-redux';
import { fetchShoppingCart } from './state/slices';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const { token: jwt } = useSelector(state => state.user);

  if (jwt === null)
    return <Navigate to={'/sign/signIn'} state={{ from: location }} replace />;
  return children;
};

function App() {
  const dispatch = useDispatch();
  const { token: jwt } = useSelector(state => state.user);

  useEffect(() => {
    if (jwt !== null) dispatch<any>(fetchShoppingCart(jwt));
  }, [jwt, dispatch]);

  const formRoute = (route: string) => {
    const publicUrl = process.env.PUBLIC_URL;
    console.log(publicUrl, 123);
    if (publicUrl) {
      if (route === '/') return `/${publicUrl}`;
      else return `/${publicUrl}/${route}`;
    }
  };

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path={formRoute('/')} element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path='products/:productId' element={<Product />} />
            <Route path='products/filter' element={<FilteredProducts />} />
            <Route
              path='products/filter/:keywords'
              element={<FilteredProducts />}
            />
            <Route
              path='shoppingCart'
              element={
                <RequireAuth>
                  <ShoppinpCart />
                </RequireAuth>
              }
            />
            <Route
              path='placeOrder'
              element={
                <RequireAuth>
                  <PlaceOrder />
                </RequireAuth>
              }
            />
          </Route>
          <Route path={formRoute('sign')} element={<SignInUpLayout />}>
            <Route path='signIn' element={<SignIn />} />
            <Route path='signUp' element={<SignUp />} />
          </Route>
          {/* <Route path='/react-travel-ejected' element={<Navigate to={'/'} />} /> */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
