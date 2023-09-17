import { Link } from 'react-router-dom';
import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <main className={css.mainContainer}>
      <div>
        <h1 className={css.mainTitle}>car rental for you</h1>
        <p className={css.bottomText}>
          Welcome to the world of comfort and freedom on wheels! Our cars are
          ready to make your trip unforgettable. Rent a car right now and go on
          a trip with confidence and pleasure!
        </p>

        <Link to={'/catalog'} className="button-primary btn-home">
          Catalog
        </Link>
      </div>
    </main>
  );
}
