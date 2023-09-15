import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import css from './SharedLayout.module.css';
// import NavMenu from './NavMenu';
// import MenuIcon from './MenuIcon';

const SharedLayout = () => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section>
      {/* <NavMenu isActive={isMenuOpen} setClose={setIsMenuOpen} />
      <MenuIcon isActive={isMenuOpen} onClick={setIsMenuOpen} /> */}
      <nav className={css.navBar}>
        <Link to={'/'} className="button-primary">
          Home
        </Link>
        <Link to={'/catalog'} className="button-primary">
          Catalog
        </Link>
        <Link to={'/favorites'} className="button-primary">
          Favorites
        </Link>
      </nav>
      <main className={css.main}>
        <Suspense>
          <Outlet />
        </Suspense>
      </main>
    </section>
  );
};

export default SharedLayout;
