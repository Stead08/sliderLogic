import { CarouselState } from '../core/types';

export const showSlide = (index: number, slidesPerView: number = 1) => (state: CarouselState): CarouselState => {
  const newSlides = state.slides.map((slide, i) => {
    slide.style.display = (i >= index && i < index + slidesPerView) ? 'block' : 'none';
    return slide;
  });
  return { ...state, slides: newSlides, currentIndex: index };
};
