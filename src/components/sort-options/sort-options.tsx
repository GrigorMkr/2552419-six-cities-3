type SortOption = {
  name: string;
  value: string;
}

type SortOptionsProps = {
  currentSort?: string;
  isOpen?: boolean;
  options?: SortOption[];
}

const DEFAULT_SORT_OPTIONS: SortOption[] = [
  { name: 'Popular', value: 'popular' },
  { name: 'Price: low to high', value: 'price-low' },
  { name: 'Price: high to low', value: 'price-high' },
  { name: 'Top rated first', value: 'rating' },
];

function SortOptions({currentSort = 'Popular', isOpen = false, options = DEFAULT_SORT_OPTIONS}: SortOptionsProps): JSX.Element {
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {options.map((option) => (
          <li
            key={option.value}
            className={`places__option ${option.name === currentSort ? 'places__option--active' : ''}`}
            tabIndex={0}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortOptions;

