import { CarouselState } from '../core/types';
import { nextSlide } from './nextSlide';

export const startAutoPlay = (updateState: (state: CarouselState) => void) => (state: CarouselState): CarouselState => {
  if (state.timer !== null) return state;

  const timer = window.setInterval(() => {
    state = nextSlide(state);
    updateState(state);
  }, state.interval);

  return { ...state, timer };
};
