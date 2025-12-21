import { ChangeEvent, FC } from 'react';

const STAR_ICON = {
  WIDTH: 37,
  HEIGHT: 33,
} as const;

type RatingStarProps = {
  value: number;
  title: string;
  checked: boolean;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}

const RatingStar: FC<RatingStarProps> = ({ value, title, checked, onChange }) => {
  const id = `${value}-stars`;

  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={String(value)}
        id={id}
        type="radio"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="reviews__rating-label form__rating-label" title={title}>
        <svg className="form__star-image" width={STAR_ICON.WIDTH} height={STAR_ICON.HEIGHT}>
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
};

export default RatingStar;

