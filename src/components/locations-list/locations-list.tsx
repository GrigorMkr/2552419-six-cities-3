import { City } from '../../types/offer';

type LocationsListProps = {
  cities: City[];
  activeCity?: string;
}

function LocationsList({cities, activeCity}: LocationsListProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li key={city.name} className="locations__item">
              <a
                className={`locations__item-link tabs__item ${city.isActive || activeCity === city.name ? 'tabs__item--active' : ''}`}
                href="#"
              >
                <span>{city.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default LocationsList;

