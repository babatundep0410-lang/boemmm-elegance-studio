import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { CartDrawer } from './CartDrawer';
import { Footer } from './Footer';

export const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={isHome ? '' : 'pt-32 flex-1'}>
        <Outlet />
      </main>
      {!isHome && <Footer />}
      <CartDrawer />
    </div>
  );
};
