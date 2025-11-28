import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import PlaceCard from '../../components/place-card/place-card';
import { Offer } from '../../types/offer';

const FAVORITES_OFFERS: Offer[] = [
  {
    id: '1',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    price: 180,
    previewImage: 'img/apartment-small-03.jpg',
    rating: 5.0,
    isFavorite: true,
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 10,
    },
  },
  {
    id: '2',
    title: 'Wood and stone place',
    type: 'Room',
    price: 80,
    previewImage: 'img/room-small.jpg',
    rating: 4.0,
    isFavorite: true,
    location: {
      latitude: 52.35054,
      longitude: 4.908976,
      zoom: 10,
    },
  },
  {
    id: '3',
    title: 'White castle',
    type: 'Apartment',
    price: 180,
    previewImage: 'img/apartment-small-04.jpg',
    rating: 5.0,
    isFavorite: true,
    location: {
      latitude: 52.39054,
      longitude: 4.853096,
      zoom: 10,
    },
  },
];

function FavoritesPage(): JSX.Element {
  const amsterdamOffers = FAVORITES_OFFERS.slice(0, 2);
  const cologneOffers = FAVORITES_OFFERS.slice(2);

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
