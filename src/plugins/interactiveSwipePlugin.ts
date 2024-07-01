import { CarouselState, Plugin } from '../core/types';

export const interactiveSwipePlugin: Plugin = (state: CarouselState): CarouselState => {
  const container = state.track;
  let startX: number = 0;
  let currentTranslate: number = 0;
  let prevTranslate: number = 0;
  let isDragging = false;

  const slides = state.slides;
  const slidesCount = slides.length;

  const setPositionByIndex = () => {
    currentTranslate = state.currentIndex * -container.clientWidth / state.slidesPerView;
    prevTranslate = currentTranslate;
    setSliderPosition();
  };

  const setSliderPosition = () => {
    container.style.transform = `translateX(${currentTranslate}px)`;
  };

  const handleDragStart = (position: number) => {
    isDragging = true;
    startX = position;
    if (state.onDragStart) state.onDragStart(state);
  };

  const handleDragging = (position: number) => {
    if (isDragging) {
      currentTranslate = prevTranslate + position - startX;
      setSliderPosition();
      if (state.onDrag) state.onDrag(state);
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    isDragging = false;

    const movedBy = currentTranslate - prevTranslate;
    const threshold = container.clientWidth / state.slidesPerView / 2;  // スライド距離のしきい値を調整

    if (movedBy < -threshold && state.currentIndex < slidesCount - state.slidesPerView) {
      state.currentIndex = Math.min(state.currentIndex + 1, slidesCount - state.slidesPerView);
      if (state.onSlideChange) state.onSlideChange(state);
    }
    if (movedBy > threshold && state.currentIndex > 0) {
      state.currentIndex = Math.max(state.currentIndex - 1, 0);
      if (state.onSlideChange) state.onSlideChange(state);
    }

    setPositionByIndex();
    if (state.onDragEnd) state.onDragEnd(state);
  };

  container.addEventListener('mousedown', (event) => handleDragStart(event.clientX));
  container.addEventListener('mousemove', (event) => handleDragging(event.clientX));
  container.addEventListener('mouseup', handleDragEnd);
  container.addEventListener('mouseleave', handleDragEnd);

  container.addEventListener('touchstart', (event) => handleDragStart(event.touches[0].clientX));
  container.addEventListener('touchmove', (event) => handleDragging(event.touches[0].clientX));
  container.addEventListener('touchend', handleDragEnd);

  setPositionByIndex();

  return state;
};
