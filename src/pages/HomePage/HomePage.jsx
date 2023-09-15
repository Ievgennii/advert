import { Link } from 'react-router-dom';
import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <main className={css.mainContainer}>
      <div>
        <h1 className={css.mainTitle}>car rental for you</h1>
        <p className={css.bottomText}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At dolorem
          ducimus eaque ratione numquam magni debitis nobis excepturi atque ipsa
          saepe commodi cumque fuga nostrum, tenetur consequatur veritatis ipsum
          ullam quas blanditiis nihil similique enim cupiditate quis! Quos illum
          repudiandae dolorum inventore iure molestiae suscipit itaque quod
          corrupti, autem molestias.
        </p>

        <Link to={'/catalog'} className="button-primary btn-home">
          Book Now
        </Link>
      </div>
    </main>
  );
}
