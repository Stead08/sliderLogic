import { CarouselState, Plugin } from '../core/types';

export const applyPlugins = (plugins: Plugin[]) => (state: CarouselState): CarouselState => {
  return plugins.reduce((accState, plugin) => plugin(accState), state);
};
