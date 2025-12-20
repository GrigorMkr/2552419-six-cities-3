import { useState, useCallback, FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/header/header';
import LocationsList from '../../components/locations-list/locations-list';
import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import { FAVORITE_COUNT, CITIES, DEFAULT_SORT_OPTIONS, MOCK_EMAIL } from '../../constants';
import type { RootState } from '../../store';

type SortType = 'popular' | 'price-low' | 'price-high' | 'rating';

const selectCity = (state: RootState) => state.data.city;
const selectOffers = (state: RootState) => state.data.offers;

const MainPage: FC = () => {
  const city = useSelector(selectCity);
  const allOffers = useSelector(selectOffers);

  const filteredOffers = useMemo(() => allOffers.filter((offer) => offer.city.name === city.name), [allOffers, city]);

  const citiesWithActive = useMemo(() => CITIES.map((cityItem) => ({
    ...cityItem,
    isActive: cityItem.name === city.name,
  })), [city]);

  const [selectedOfferId, setSelectedOfferId] = useState<string | undefined>();
  const [currentSort, setCurrentSort] = useState<SortType>('popular');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortedOffers = useMemo(() => {
    const offersCopy = [...filteredOffers];

    switch (currentSort) {
      case 'price-low':
        return offersCopy.sort((a, b) => a.price - b.price);
      case 'price-high':
        return offersCopy.sort((a, b) => b.price - a.price);
      case 'rating':
        return offersCopy.sort((a, b) => b.rating - a.rating);
      case 'popular':
      default:
        return offersCopy;
    }
  }, [filteredOffers, currentSort]);

  const handleCardHover = useCallback((offerId: string | undefined) => {
    setSelectedOfferId(offerId);
  }, []);

  const handleSortChange = useCallback((sortType: SortType) => {
    setCurrentSort(sortType);
    setIsSortOpen(false);
  }, []);

  const handleSortToggle = useCallback(() => {
    setIsSortOpen(!isSortOpen);
  }, [isSortOpen]);

  const getSortName = useCallback((sort: SortType): string => {
    const option = DEFAULT_SORT_OPTIONS.find((opt) => opt.value === sort);
    return option?.name || 'Popular';
  }, []);

  return (
    <div className="page page--gray page--main">
      <Header
        user={{
          email: MOCK_EMAIL,
          favoriteCount: FAVORITE_COUNT.DEFAULT,
        }}
      />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <LocationsList cities={citiesWithActive} activeCity={city} />
        <div className="cities">
          <div className="cities__places-container container">
            <PlacesList
              offers={sortedOffers}
              offersCount={sortedOffers.length}
              cityName={city.name}
              currentSort={getSortName(currentSort)}
              isSortOpen={isSortOpen}
              onSortChange={handleSortChange}
              onSortToggle={handleSortToggle}
              onCardHover={handleCardHover}
            />
            <div className="cities__right-section">
              <Map offers={sortedOffers} selectedOfferId={selectedOfferId} className="cities__map" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;

