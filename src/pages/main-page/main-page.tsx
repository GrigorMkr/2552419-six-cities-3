import { useState } from 'react';
import Header from '../../components/header/header';
import LocationsList from '../../components/locations-list/locations-list';
import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import { City, Offer } from '../../types/offer';

type MainPageProps = {
  offersCount: number;
}

const CITIES: City[] = [
  { name: 'Paris' },
  { name: 'Cologne' },
  { name: 'Brussels' },
  { name: 'Amsterdam', isActive: true },
  { name: 'Hamburg' },
  { name: 'Dusseldorf' },
];

const MOCK_OFFERS: Offer[] = [
  {
    id: '1',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    price: 120,
    previewImage: 'img/apartment-01.jpg',
    rating: 4.0,
    isFavorite: false,
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
    previewImage: 'img/apartment-02.jpg',
    rating: 4.5,
    isFavorite: true,
    location: {
      latitude: 52.35054,
      longitude: 4.908976,
      zoom: 10,
    },
  },
  {
    id: '3',
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    price: 132,
    previewImage: 'img/apartment-03.jpg',
    rating: 4.8,
    isFavorite: false,
    location: {
      latitude: 52.39054,
      longitude: 4.853096,
      zoom: 10,
    },
  },
  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    price: 180,
    previewImage: 'img/apartment-small-03.jpg',
    rating: 4.2,
    isFavorite: true,
    location: {
      latitude: 52.38054,
      longitude: 4.939309,
      zoom: 10,
    },
  },
  {
    id: '5',
    title: 'Wood and stone place',
    type: 'Room',
    price: 80,
    previewImage: 'img/apartment-small-04.jpg',
    rating: 4.0,
    isFavorite: false,
    location: {
      latitude: 52.36054,
      longitude: 4.853096,
      zoom: 10,
    },
  },
];

function MainPage({offersCount}: MainPageProps): JSX.Element {
  const activeCity = CITIES.find((city) => city.isActive)?.name || 'Amsterdam';
  const [selectedOfferId, setSelectedOfferId] = useState<string | undefined>();

  return (
    <div className="page page--gray page--main">
      <Header
        user={{
          email: 'Oliver.conner@gmail.com',
          favoriteCount: 3,
        }}
      />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <LocationsList cities={CITIES} activeCity={activeCity} />
        <div className="cities">
          <div className="cities__places-container container">
            <PlacesList
              offers={MOCK_OFFERS}
              offersCount={offersCount}
              cityName={activeCity}
              currentSort="Popular"
              isSortOpen
              onCardHover={setSelectedOfferId}
            />
            <div className="cities__right-section">
              <Map offers={MOCK_OFFERS} selectedOfferId={selectedOfferId} className="cities__map" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;

