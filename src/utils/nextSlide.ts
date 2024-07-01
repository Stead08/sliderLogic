import { CarouselState } from '../core/types';
import { showSlide } from './showSlide';

export const nextSlide = (state: CarouselState, slidesPerView: number = 1): CarouselState => {
  const nextIndex = Math.min(state.currentIndex + 1, state.slides.length - slidesPerView);
  return showSlide(nextIndex, slidesPerView)(state);
};
