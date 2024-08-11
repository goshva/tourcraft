import { defineStore } from 'pinia';

export const useMapStore = defineStore('map', {
  state: () => ({
    features: []
  }),
  actions: {
    setFeatures(features) {
      this.features = features;
    },
    async loadFeatures() {
      try {
        const response = await fetch('/map.json');
        const data = await response.json();
        this.setFeatures(data.config?.userMap?.features);
      } catch (error) {
        console.error('Failed to load features:', error);
      }
    }
  }
});
