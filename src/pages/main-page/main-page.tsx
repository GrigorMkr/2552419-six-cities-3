import { useState } from 'react';
import Header from '../../components/header/header';
import LocationsList from '../../components/locations-list/locations-list';
import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import { City, Offer } from '../../types/offer';

type MainPageProps = {
  offersCount: number;
  offers: Offer[];
}

const CITIES: City[] = [
  { name: 'Paris' },
  { name: 'Cologne' },
  { name: 'Brussels' },
  { name: 'Amsterdam', isActive: true },
  { name: 'Hamburg' },
  { name: 'Dusseldorf' },
];

function MainPage({offersCount, offers}: MainPageProps): JSX.Element {
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
              offers={offers}
              offersCount={offersCount}
              cityName={activeCity}
              currentSort="Popular"
              isSortOpen
              onCardHover={setSelectedOfferId}
            />
            <div className="cities__right-section">
              <Map offers={offers} selectedOfferId={selectedOfferId} className="cities__map" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;

