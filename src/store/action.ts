import type { Offer, City } from '../types/offer';

const changeCity = (city: City) => ({
  type: 'city/changeCity' as const,
  payload: city,
});

const loadOffers = (offers: Offer[]) => ({
  type: 'offers/loadOffers' as const,
  payload: offers,
});

export { changeCity, loadOffers };

