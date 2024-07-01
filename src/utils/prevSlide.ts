import { CarouselState } from '../core/types';
import { showSlide } from './showSlide';

export const prevSlide = (state: CarouselState, slidesPerView: number = 1): CarouselState => {
  const prevIndex = Math.max(state.currentIndex - 1, 0);
  return showSlide(prevIndex, slidesPerView)(state);
};
