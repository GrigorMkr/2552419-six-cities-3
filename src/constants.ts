import L from 'leaflet';
import type { City, Offer } from './types/offer';
import type { Review } from './mocks/reviews';

const MAP_ICON = {
  WIDTH: 27,
  HEIGHT: 39,
  ANCHOR_X: 13.5,
  ANCHOR_Y: 39,
} as const;

const RATING = {
  MIN: 1,
  MAX: 5,
  VALUE_2: 2,
  VALUE_3: 3,
  VALUE_4: 4,
} as const;

const MIN_COMMENT_LENGTH = 50;
const PERCENT_PER_STAR = 20;

const OFFER = {
  NEARBY_COUNT: 3,
  DEFAULT_BEDROOMS_COUNT: 3,
  DEFAULT_MAX_ADULTS_COUNT: 4,
  PREMIUM_INDEX: 2,
  AMSTERDAM_COUNT: 2,
  FIRST_INDEX: 0,
} as const;

const FAVORITE_COUNT = {
  DEFAULT: 3,
  EMPTY: 0,
} as const;

const MOCK_EMAIL = 'Oliver.conner@gmail.com';

const MOCK_OFFER = {
  RATING: 4.8,
  PRICE: 120,
} as const;

const PARTICLES_COUNT = 20;

const CITY_NAME = {
  DEFAULT_ACTIVE: 'Amsterdam',
  EMPTY_PAGE_ACTIVE: 'Dusseldorf',
} as const;

enum SortType {
  Popular = 'popular',
  PriceLow = 'price-low',
  PriceHigh = 'price-high',
  Rating = 'rating',
}

type SortOption = {
  name: string;
  value: SortType;
}

const DEFAULT_SORT_OPTIONS: SortOption[] = [
  { name: 'Popular', value: SortType.Popular },
  { name: 'Price: low to high', value: SortType.PriceLow },
  { name: 'Price: high to low', value: SortType.PriceHigh },
  { name: 'Top rated first', value: SortType.Rating },
];

const GALLERY_IMAGES = [
  'img/room.jpg',
  'img/apartment-01.jpg',
  'img/apartment-02.jpg',
  'img/apartment-03.jpg',
  'img/studio-01.jpg',
  'img/apartment-01.jpg',
];

const INSIDE_ITEMS = [
  'Wi-Fi',
  'Washing machine',
  'Towels',
  'Heating',
  'Coffee machine',
  'Baby seat',
  'Kitchen',
  'Dishwasher',
  'Cable TV',
  'Fridge',
];

const REVIEWS_DATA: Review[] = [
  {
    id: '1',
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
    },
    rating: 4.0,
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: '2019-04-24',
  },
];

const NEARBY_OFFERS: Offer[] = [
  {
    id: '1',
    title: 'Wood and stone place',
    type: 'Room',
    price: 80,
    previewImage: 'img/room.jpg',
    rating: 4.0,
    isFavorite: true,
    city: { name: 'Amsterdam' },
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 10,
    },
  },
  {
    id: '2',
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    price: 132,
    previewImage: 'img/apartment-02.jpg',
    rating: 4.0,
    isFavorite: false,
    city: { name: 'Amsterdam' },
    location: {
      latitude: 52.35054,
      longitude: 4.908976,
      zoom: 10,
    },
  },
  {
    id: '3',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    price: 180,
    previewImage: 'img/apartment-03.jpg',
    rating: 5.0,
    isFavorite: false,
    city: { name: 'Amsterdam' },
    location: {
      latitude: 52.39054,
      longitude: 4.853096,
      zoom: 10,
    },
  },
];

const DEFAULT_ICON = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [MAP_ICON.WIDTH, MAP_ICON.HEIGHT],
  iconAnchor: [MAP_ICON.ANCHOR_X, MAP_ICON.ANCHOR_Y],
});

const ACTIVE_ICON = L.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [MAP_ICON.WIDTH, MAP_ICON.HEIGHT],
  iconAnchor: [MAP_ICON.ANCHOR_X, MAP_ICON.ANCHOR_Y],
});

const CITIES: City[] = [
  { name: 'Paris' },
  { name: 'Cologne' },
  { name: 'Brussels' },
  { name: 'Amsterdam' },
  { name: 'Hamburg' },
  { name: 'Dusseldorf' },
];

enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
}

const getOfferUrl = (id: string): string => `/offer/${id}`;

export type { SortOption };
export { AppRoute, SortType };
export {
  MAP_ICON,
  RATING,
  MIN_COMMENT_LENGTH,
  PERCENT_PER_STAR,
  OFFER,
  FAVORITE_COUNT,
  MOCK_EMAIL,
  MOCK_OFFER,
  PARTICLES_COUNT,
  CITY_NAME,
  DEFAULT_SORT_OPTIONS,
  GALLERY_IMAGES,
  INSIDE_ITEMS,
  REVIEWS_DATA,
  NEARBY_OFFERS,
  DEFAULT_ICON,
  ACTIVE_ICON,
  CITIES,
  getOfferUrl,
};
