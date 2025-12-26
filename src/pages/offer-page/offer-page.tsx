import { FC, useMemo, useEffect, useCallback, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import PremiumMark from '../../components/premium-mark/premium-mark';
import BookmarkButton from '../../components/bookmark-button/bookmark-button';
import Rating from '../../components/rating/rating';
import OfferFeatures from '../../components/offer-features/offer-features';
import Price from '../../components/price/price';
import OfferInside from '../../components/offer-inside/offer-inside';
import OfferHost from '../../components/offer-host/offer-host';
import Reviews from '../../components/reviews/reviews';
import Map from '../../components/map/map';
import PlaceCard from '../../components/place-card/place-card';
import Spinner from '../../components/spinner/spinner';
import { PlaceCardVariant } from '../../types/place-card-variant';
import { OFFER, AppRoute } from '../../constants';
import { selectNearbyOffers, selectOfferById } from '../../store/data-slice';
import { selectReviewsByOfferId } from '../../store/reviews-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import { useAuth } from '../../hooks/use-auth';
import { fetchReviewsAction, fetchOfferByIdAction, toggleFavoriteAction, fetchNearbyOffersAction } from '../../store/api-actions';

const OfferPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthorized } = useAuth();
  const [isOfferLoading, setIsOfferLoading] = useState(true);

  const currentOffer = useAppSelector((state) => selectOfferById(state, id));
  const nearbyOffersFromStore = useAppSelector((state) => selectNearbyOffers(state, id));
  const reviews = useAppSelector((state) => id ? selectReviewsByOfferId(state, id) : []);

  const nearbyOffers = useMemo(() => nearbyOffersFromStore.slice(0, OFFER.NEARBY_COUNT), [nearbyOffersFromStore]);
  const mapOffers = useMemo(() => currentOffer ? [currentOffer, ...nearbyOffers] : nearbyOffers, [currentOffer, nearbyOffers]);

  const offerImages = useMemo(() => {
    if (currentOffer?.images && currentOffer.images.length > 0) {
      return currentOffer.images;
    }
    return currentOffer?.previewImage ? [currentOffer.previewImage] : [];
  }, [currentOffer?.images, currentOffer?.previewImage]);

  const descriptionParagraphs = useMemo(() => {
    if (!currentOffer?.description) {
      return [];
    }
    return currentOffer.description.split('\n');
  }, [currentOffer?.description]);

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsOfferLoading(true);

    dispatch(fetchOfferByIdAction(id))
      .then((result) => {
        if (fetchOfferByIdAction.rejected.match(result) && result.payload === 'NOT_FOUND') {
          navigate(AppRoute.NotFound as string, { replace: true });
        } else {
          dispatch(fetchNearbyOffersAction(id));
          dispatch(fetchReviewsAction(id));
        }
      })
      .finally(() => {
        setIsOfferLoading(false);
      });
  }, [dispatch, id, navigate]);

  const handleBookmarkClick = useCallback(() => {
    if (!isAuthorized) {
      navigate(AppRoute.Login);
      return;
    }
    if (currentOffer && id) {
      dispatch(toggleFavoriteAction({
        offerId: id,
        isFavorite: !currentOffer.isFavorite,
      }));
    }
  }, [isAuthorized, navigate, dispatch, currentOffer, id]);

  if (isOfferLoading) {
    return <Spinner />;
  }

  if (!currentOffer) {
    return null;
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery
            images={offerImages}
          />
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && <PremiumMark variant="offer" />}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <BookmarkButton size="large" isActive={currentOffer.isFavorite} onClick={handleBookmarkClick} />
              </div>
              <Rating rating={currentOffer.rating} className="offer__rating" showValue />
              {currentOffer.bedrooms !== undefined && currentOffer.maxAdults !== undefined && (
                <OfferFeatures type={currentOffer.type} bedrooms={currentOffer.bedrooms} maxAdults={currentOffer.maxAdults} />
              )}
              <Price value={currentOffer.price} variant="offer" />
              {currentOffer.goods && (
                currentOffer.goods.length > 0 && <OfferInside items={currentOffer.goods} />
              )}
              {descriptionParagraphs.length > 0 && (
                <div className="offer__description">
                  {descriptionParagraphs.map((paragraph) => (
                    <p key={`${paragraph.substring(0, Math.min(paragraph.length, 30))}-${paragraph.length}`} className="offer__text">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
              {currentOffer.host && (
                <OfferHost
                  name={currentOffer.host.name}
                  avatarUrl={currentOffer.host.avatarUrl}
                  isPro={currentOffer.host.isPro}
                  description={descriptionParagraphs}
                />
              )}
              <Reviews reviews={reviews} showForm={isAuthorized} offerId={currentOffer.id} />
            </div>
          </div>
          <Map offers={mapOffers} selectedOfferId={currentOffer?.id} className="offer__map" />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearbyOffers.map((offer) => (
                <PlaceCard
                  key={offer.id}
                  offer={offer}
                  variant={PlaceCardVariant.NearPlaces}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default OfferPage;
