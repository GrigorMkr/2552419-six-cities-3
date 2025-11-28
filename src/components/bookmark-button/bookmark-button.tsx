type BookmarkButtonProps = {
  isActive?: boolean;
  className?: string;
  size?: 'small' | 'large';
  onClick?: () => void;
}

function BookmarkButton({isActive = false, className = '', size = 'small', onClick}: BookmarkButtonProps): JSX.Element {
  const iconWidth = size === 'large' ? 31 : 18;
  const iconHeight = size === 'large' ? 33 : 19;
  const buttonClass = size === 'large' ? 'offer__bookmark-button' : 'place-card__bookmark-button';
  const iconClass = size === 'large' ? 'offer__bookmark-icon' : 'place-card__bookmark-icon';
  const activeClass = isActive ? `${buttonClass}--active` : '';
  const text = isActive ? 'In bookmarks' : 'To bookmarks';

  return (
    <button
      className={`${buttonClass} button ${activeClass} ${className}`}
      type="button"
      onClick={onClick}
    >
      <svg className={iconClass} width={iconWidth} height={iconHeight}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{text}</span>
    </button>
  );
}

export default BookmarkButton;

