export type Review = {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  rating: number;
  comment: string;
  date: string;
}

export const MOCK_REVIEWS: Review[] = [
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

