import { useState, useEffect } from 'react';
import AdvertCard from 'components/AdvertCard/AdvertCard';
import * as API from '../../services/carsApi';
import css from './FavoritesPage.module.css';
import Modal from 'components/Modal/Modal';
import ModalCard from 'components/Modal/ModalCard/ModalCard';

export default function FavoritesPage() {
  const [favCards, setFavCards] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [showLoadMore, setShowLoadrMore] = useState(true);
  const [carId, setCarId] = useState(null);
  const [likeChangd, setLikeChanged] = useState(true);
  const [status, setStatus] = useState('fullfield');

  useEffect(() => {
    (async () => {
      setStatus('pending');
      const res = await API.getFavotites();
      res && setFavCards(res);
      res && setStatus('fullfield');
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setStatus('pending');
      const res = await API.getFavotites();
      res && setFavCards(res);
      res && setStatus('fullfield');
    })();
  }, [likeChangd]);

  useEffect(() => {
    if (page !== 1) {
      (async () => {
        try {
          const response = await API.getFavotites(page);
          response &&
            setFavCards(prev => {
              return [...prev, ...response];
            });
          response && response.length < 8 && setShowLoadrMore(false);
        } catch (e) {}
      })();
    }
  }, [page]);

  const openModal = id => {
    setShowModal(true);
    setCarId(id);
  };

  return (
    <>
      <div className={css.divTitle}>
        <h1 className={css.favTitle}>Favorites</h1>
      </div>
      {status === 'fullfield' ? (
        <ul className={css.cardList}>
          {favCards &&
            favCards.map(favCard => (
              <AdvertCard
                advert={favCard}
                key={favCard.id}
                openModal={openModal}
                isChanged={() => setLikeChanged(prev => !prev)}
              />
            ))}
        </ul>
      ) : (
        <div className={css.margin}>
          <ul className={css.container}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      )}
      {favCards && favCards.length === 0 && (
        <div className={css.divTitle}>
          <p className={css.favTitle}>You don't have favorite cards yet</p>
        </div>
      )}
      {showModal && (
        <Modal onClose={() => setShowModal(prev => !prev)} active={showModal}>
          <ModalCard
            id={carId}
            closeModal={() => setShowModal(prev => !prev)}
          />
        </Modal>
      )}
      {showLoadMore && favCards?.length > 7 && (
        <div className={css.btnContainer}>
          <button
            className="button-secondary"
            onClick={() => setPage(prev => prev + 1)}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
}
