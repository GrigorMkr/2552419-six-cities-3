import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import Rating from '../rating/rating';
import BookmarkButton from '../bookmark-button/bookmark-button';
import Price from '../price/price';
import PremiumMark from '../premium-mark/premium-mark';

type PlaceCardProps = {
  offer: Offer;
  onCardHover?: (offerId: string) => void;
  variant?: 'cities' | 'near-places' | 'favorites';
  isPremium?: boolean;
}

function PlaceCard({offer, onCardHover, variant = 'cities', isPremium = false}: PlaceCardProps): JSX.Element {
  let imageWrapperClass = 'cities__image-wrapper';
  let cardClass = 'cities__card';

  if (variant === 'near-places') {
    imageWrapperClass = 'near-places__image-wrapper';
    cardClass = 'near-places__card';
  } else if (variant === 'favorites') {
    imageWrapperClass = 'favorites__image-wrapper';
    cardClass = 'favorites__card';
  }

  const imageWidth = variant === 'favorites' ? 150 : 260;
  const imageHeight = variant === 'favorites' ? 110 : 200;

  return (
    <article
      className={`${cardClass} place-card`}
      onMouseEnter={() => onCardHover?.(offer.id)}
    >
      {isPremium && <PremiumMark />}
      <div className={`${imageWrapperClass} place-card__image-wrapper`}>
        <Link to={`/offer/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={imageWidth}
            height={imageHeight}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={`${variant === 'favorites' ? 'favorites__card-info' : ''} place-card__info`}>
        <div className="place-card__price-wrapper">
          <Price value={offer.price} />
          <BookmarkButton isActive={offer.isFavorite} />
        </div>
        <Rating rating={offer.rating} className="place-card__rating" />
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;

