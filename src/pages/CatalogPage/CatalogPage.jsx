import { useState, useEffect } from 'react';
import * as API from '../../services/carsApi.js';
import AdvertCard from 'components/AdvertCard/AdvertCard.jsx';
import css from './CalatogPage.module.css';

import Modal from 'components/Modal/Modal';
import ModalCard from 'components/Modal/ModalCard/ModalCard.jsx';
import SearchBar from 'components/SearchBar/SearchBar.jsx';

import { readFromLS, writeToLS } from 'services/localStoreApi.js';

export default function CatalogPage() {
  const [adverts, setAdverts] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [carId, setCarId] = useState(null);
  const [showLoadMore, setShowLoadrMore] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [shoundUpdateCache, setShoundUpdateCache] = useState(false);
  const [status, setStatus] = useState('fullfield');

  useEffect(() => {
    (async () => {
      setStatus('pending');
      setShoundUpdateCache(false);
      setError(null);
      try {
        if (!readFromLS('cars')) {
          const all = await API.getAll();
          all && writeToLS('cars', all.data);
        }
        const response = await API.getCars();
        response && setAdverts(response);
        setIsSearchActive(false);
        response && setStatus('fullfield');
      } catch (e) {
        setStatus('rejected');
        setError(e.message);
      }
    })();
  }, []);

  useEffect(() => {
    if (page !== 1 && !isSearchActive) {
      (async () => {
        setShoundUpdateCache(false);
        try {
          const response = await API.getCars(page);
          response &&
            setAdverts(prev => {
              return [...prev, ...response];
            });
          response && response.length < 8 && setShowLoadrMore(false);
        } catch (e) {
          setError(e.message);
        }
      })();
    }
  }, [isSearchActive, page]);

  useEffect(() => {
    (async () => {
      if (isSearchActive) {
        const response = await API.search(searchData, page, shoundUpdateCache);
        response && setAdverts(response);
        response && response.length >= 8 && response.length < 30
          ? setShowLoadrMore(true)
          : setShowLoadrMore(false);
      }
    })();
  }, [isSearchActive, page, searchData, shoundUpdateCache]);

  const openModal = id => {
    setShowModal(true);
    setCarId(id);
  };

  function handleSearch(data) {
    setSearchData(data);
    setPage(1);
    setShowLoadrMore(true);
    setIsSearchActive(true);
  }

  return (
    <>
      <h1 className="visually-hidden">Car Rantal Catalog</h1>
      <SearchBar onSearch={handleSearch} />
      {status === 'fullfield' ? (
        <ul className={css.cardList}>
          {adverts &&
            adverts.map(advert => (
              <AdvertCard
                advert={advert}
                key={advert.id}
                openModal={openModal}
                isChanged={() => setShoundUpdateCache(true)}
              />
            ))}
        </ul>
      ) : (
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
      )}

      {showLoadMore && adverts?.length > 7 && (
        <div className={css.btnContainer}>
          <button
            className="button-secondary"
            onClick={() => setPage(prev => prev + 1)}
          >
            Load more
          </button>
        </div>
      )}
      {adverts && adverts.length === 0 && (
        <div className={css.divTitle}>
          <p className={css.favTitle}>Unfortunately nothing was found</p>
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
      {status === 'rejected' && error && (
        <div className={css.error}> {error} </div>
      )}
    </>
  );
}
