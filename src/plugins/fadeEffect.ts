import { CarouselState, Plugin } from '../core/types';

export const fadeEffect: Plugin = (state: CarouselState): CarouselState => {
  state.slides.forEach(slide => {
    slide.style.transition = 'opacity 0.5s ease';
    slide.style.opacity = '0';
  });

  const showSlide = (index: number) => {
    state.slides.forEach((slide, i) => {
      slide.style.opacity = i === index ? '1' : '0';
    });
  };

  state.showSlide = (index: number) => {
    showSlide(index);
    state.currentIndex = index;
  };

  showSlide(state.currentIndex);
  return state;
};
