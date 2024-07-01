export interface CarouselState {
  slides: HTMLElement[];
  currentIndex: number;
  interval: number;
  timer: any;
  slidesPerView: number;
  track: HTMLElement;
  nextSlide?: () => void;
  prevSlide?: () => void;
  showSlide?: (index: number) => void;
  onTouchStart?: Hook;
  onTouchEnd?: Hook;
  onDrag?: Hook;
  onDragStart?: Hook;
  onDragEnd?: Hook;
  onSlideChange?: Hook;
}

export interface CarouselOptions {
  initialSlide?: number;
  interval?: number;
  slidesPerView?: number;
}

export type Plugin = (state: CarouselState) => CarouselState;
export type Hook = (state: CarouselState) => void; // Hookの型定義を追加
