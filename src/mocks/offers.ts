import { Offer } from '../types/offer';

export const MOCK_OFFERS: Offer[] = [
  {
    id: '1',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    price: 120,
    previewImage: 'img/apartment-01.jpg',
    rating: 4.0,
    isFavorite: false,
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 10,
    },
  },
  {
    id: '2',
    title: 'Wood and stone place',
    type: 'Room',
    price: 80,
    previewImage: 'img/apartment-02.jpg',
    rating: 4.5,
    isFavorite: true,
    location: {
      latitude: 52.35054,
      longitude: 4.908976,
      zoom: 10,
    },
  },
  {
    id: '3',
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    price: 132,
    previewImage: 'img/apartment-03.jpg',
    rating: 4.8,
    isFavorite: false,
    location: {
      latitude: 52.39054,
      longitude: 4.853096,
      zoom: 10,
    },
  },
  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    price: 180,
    previewImage: 'img/apartment-small-03.jpg',
    rating: 4.2,
    isFavorite: true,
    location: {
      latitude: 52.38054,
      longitude: 4.939309,
      zoom: 10,
    },
  },
];

