import { defineStore } from 'pinia';

export const useMapStore = defineStore('map', {
  state: () => ({
    features: [],
    panoramasSrc: [],
    nope: [],
    love: [],

  }),
  actions: {
    setFeatures(features) {
      this.features = features;
    },
    setPanorams(panorams) {
      this.panoramasSrc = panorams;
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
    async loadPanoramasSrc() {
      try {
        const response = await fetch('./coordinatesPanorama.json');
        const data = await response.json();
        this.setPanorams(data);
      } catch (error) {
        console.error('Failed to load features:', error);
      }
    },

    getPanoramasSrc(coordinatesPanorama) {
     console.log(`"${coordinatesPanorama}":"",`)
      return this.panoramasSrc[coordinatesPanorama];
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
    },

  }
});
