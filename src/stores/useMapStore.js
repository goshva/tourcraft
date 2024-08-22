import { defineStore } from 'pinia';

export const useMapStore = defineStore('map', {
  state: () => ({
    features: [],
    nope: [],
    love: [],
    searchText : 'Особняк князя Дондукова-Корсакова',
    SberId: 'SberId',

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
    },
    async genImg(searchText){
      try {
        const response = await fetch('https://gigachat.devices.sberbank.ru/api/v1/chat/completions', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'Bearer <\u0442\u043E\u043A\u0435\u043D_\u0434\u043E\u0441\u0442\u0443\u043F\u0430>'
          },
          body: '{\n  "model": "GigaChat",\n  "messages": [\n    {\n      "role": "system",\n      "content": "\u0422\u044B \u2014 \u0412\u0430\u0441\u0438\u043B\u0438\u0439 \u041A\u0430\u043D\u0434\u0438\u043D\u0441\u043A\u0438\u0439"      \n    },\n    {\n      "role": "user",\n      "content": "\u041D\u0430\u0440\u0438\u0441\u0443\u0439 \u0440\u043E\u0437\u043E\u0432\u043E\u0433\u043E \u043A\u043E\u0442\u0430"\n    }\n  ],\n  "function_call": "auto",\n}'
      });
        const data = await response.json();
        this.setFeatures(data.config?.userMap?.features);
      } catch (error) {
        console.error('Failed to load features:', error);
      }

    }
  }
});
