import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import type { Review } from '../types/offer';
import type { RootState } from '../hooks/use-redux';

export type ReviewsState = {
  reviews: Record<string, Review[]>;
}

const initialState: ReviewsState = {
  reviews: {},
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    loadReviews: (state, action: PayloadAction<{ offerId: string; reviews: Review[] }>) => {
      state.reviews[action.payload.offerId] = action.payload.reviews;
    },
    addReview: (state, action: PayloadAction<{ offerId: string; review: Review }>) => {
      const { offerId, review } = action.payload;
      if (!state.reviews[offerId]) {
        state.reviews[offerId] = [];
      }
      state.reviews[offerId].unshift(review);
    },
  },
});

export const { loadReviews, addReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;

const EMPTY_REVIEWS_ARRAY: Review[] = [];

const selectReviewsState = (state: RootState) => state.reviews.reviews;

export const selectReviewsByOfferId = createSelector(
  [selectReviewsState, (_state: RootState, offerId: string) => offerId],
  (reviews, offerId): Review[] => reviews[offerId] || EMPTY_REVIEWS_ARRAY
);

