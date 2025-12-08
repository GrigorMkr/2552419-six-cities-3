import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import PlaceCard from '../../components/place-card/place-card';
import { Offer } from '../../types/offer';

type FavoritesPageProps = {
  offers: Offer[];
}

function FavoritesPage({offers}: FavoritesPageProps): JSX.Element {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const amsterdamOffers = favoriteOffers.slice(0, 2);
  const cologneOffers = favoriteOffers.slice(2);

  return (
    <div className="page">
      <Header
        user={{
          email: 'Oliver.conner@gmail.com',
          favoriteCount: 3,
        }}
      />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {amsterdamOffers.map((offer, index) => (
                    <PlaceCard
                      key={offer.id}
                      offer={offer}
                      variant="favorites"
                      isPremium={index === 0}
                    />
                  ))}
                </div>
              </li>

              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Cologne</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {cologneOffers.map((offer) => (
                    <PlaceCard
                      key={offer.id}
                      offer={offer}
                      variant="favorites"
                    />
                  ))}
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesPage;
