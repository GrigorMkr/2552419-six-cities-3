import { FC, useCallback } from 'react';
import { DEFAULT_SORT_OPTIONS, SortOption } from '../../constants';

const ARROW_ICON = {
  WIDTH: 7,
  HEIGHT: 4,
} as const;

type SortOptionsProps = {
  currentSort?: string;
  isOpen?: boolean;
  options?: SortOption[];
  onSortChange?: (sortType: 'popular' | 'price-low' | 'price-high' | 'rating') => void;
  onSortToggle?: () => void;
}

const SortOptions: FC<SortOptionsProps> = ({currentSort = 'Popular', isOpen = false, options = DEFAULT_SORT_OPTIONS, onSortChange, onSortToggle}) => {
  const handleOptionClick = useCallback((value: string) => {
    if (onSortChange) {
      onSortChange(value as 'popular' | 'price-low' | 'price-high' | 'rating');
    }
  }, [onSortChange]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={onSortToggle}>
        {currentSort}
        <svg className="places__sorting-arrow" width={ARROW_ICON.WIDTH} height={ARROW_ICON.HEIGHT}>
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {options.map((option) => (
          <li
            key={option.value}
            className={`places__option ${option.name === currentSort ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleOptionClick(option.value)}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default SortOptions;

