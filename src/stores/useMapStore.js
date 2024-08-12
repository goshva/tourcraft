import { defineStore } from 'pinia';

export const useMapStore = defineStore('map', {
  state: () => ({
    features: [],
    nope: [],
    love: []
  }),
  actions: {
    setFeatures(features) {
      this.features = features;
    },
    async loadFeatures() {
      try {
        const response = await fetch('./map.json');
        const data = await response.json();
        this.setFeatures(data.config?.userMap?.features);
      } catch (error) {
        console.error('Failed to load features:', error);
      }
    },
    addToNope(index) {
      const feature = this.features[index];
      if (feature && !this.nope.includes(feature)) {
        this.nope.push(feature);
      }
    },
    addToLove(index) {
      const feature = this.features[index];
      if (feature && !this.love.includes(feature)) {
        this.love.push(feature);
      }
    }
  }
});
