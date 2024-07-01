import {CarouselState, Plugin} from '../core/types';

export const loopSlides: Plugin = (state: CarouselState): CarouselState => {
  const { slides, slidesPerView } = state;

  const setSlidePosition = () => {
    slides.forEach((slide, index) => {
      slide.style.left = `${index * 100 / slidesPerView}%`;
    });
  };

  state.showSlide = (index: number) => {
    if (index < 0) {
      state.currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
      state.currentIndex = 0;
    } else {
      state.currentIndex = index;
    }
    setSlidePosition();
  };

  setSlidePosition();
  return state;
};
