import { useState, FormEvent, ChangeEvent, useCallback, FC } from 'react';
import { MIN_COMMENT_LENGTH, RATING } from '../../constants';
import RatingStar from '../rating-star/rating-star';

const RATING_OPTIONS = [
  { value: RATING.MAX, title: 'perfect' },
  { value: RATING.VALUE_4, title: 'good' },
  { value: RATING.VALUE_3, title: 'not bad' },
  { value: RATING.VALUE_2, title: 'badly' },
  { value: RATING.MIN, title: 'terribly' },
] as const;

const ReviewForm: FC = () => {
  const [rating, setRating] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const handleRatingChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setRating(evt.target.value);
  }, []);

  const handleCommentChange = useCallback((evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  }, []);

  const handleSubmit = useCallback((evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  }, []);

  const isSubmitDisabled = !rating || comment.length < MIN_COMMENT_LENGTH;

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATING_OPTIONS.map((option) => (
          <RatingStar
            key={option.value}
            value={option.value}
            title={option.title}
            checked={rating === String(option.value)}
            onChange={handleRatingChange}
          />
        ))}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={comment} onChange={handleCommentChange}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitDisabled}>Submit</button>
      </div>
    </form>
  );
};

export default ReviewForm;

