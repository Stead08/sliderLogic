import { CarouselState } from '../core/types';

export const stopAutoPlay = (state: CarouselState): CarouselState => {
  if (state.timer !== null) {
    clearInterval(state.timer);
  }
  return { ...state, timer: null };
};
