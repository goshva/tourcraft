<template>
  <div class="tinder" ref="tinderContainer">
    <div class="tinder--status">
      <i class="fa fa-remove"></i>
      <i class="fa fa-heart"></i>
    </div>
    <div class="tinder--cards">
      <div v-for="(card, index) in mapStore.features" :key="index" class="tinder--card" :style="{
        background: card.background || '',
        zIndex: mapStore.features.length - index,
      }" ref="cardRefs">

        <p v-if="card.content.text">{{ card.content.text }}</p>

        <img :src="card.imgSrc || `https://picsum.photos/400/300/?=${index}`" alt="Card image">
        <h3>{{ card.title }}</h3>
        <p v-if="card.content.text">{{ card.content.text }}</p>
      </div>
    </div>
    <div class="tinder--buttons">
      <button id="nope" @click="handleNopeClick"><i class="fa fa-trash"></i>{{ mapStore.nope.length }}</button>
      <button id="love" @click="handleLoveClick"><i class="fa fa-heart-o"></i> {{ mapStore.love.length }}</button>
      <button id="love" @click="handleImageUploader('Особняк князя Дондукова-Корсакова')"><i class="fa fa-photo"></i>
      </button>
      <ImageUploader />

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ImageUploader from '../components/ImageUploader.vue';
import Hammer from 'hammerjs';
import { useMapStore } from '../stores/useMapStore';

const mapStore = useMapStore();

const tinderContainer = ref(null);
const cardRefs = ref([]);

const getCardTransform = (index) => `scale(${(20 - index) / 20}) translateY(-${30 * index}px)`;

const getCardOpacity = (index) => (10 - index) / 10;

const initCards = () => {
  if (tinderContainer.value) {
    tinderContainer.value.classList.add('loaded');
  }
};

const handlePan = (event, el) => {
  el.classList.add('moving');
  if (event.deltaX === 0 || (event.center.x === 0 && event.center.y === 0)) return;

  tinderContainer.value.classList.toggle('tinder_love', event.deltaX > 0);
  tinderContainer.value.classList.toggle('tinder_nope', event.deltaX < 0);

  const xMulti = event.deltaX * 0.03;
  const yMulti = event.deltaY / 80;
  const rotate = xMulti * yMulti;

  el.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
};
const handleImageUploader = (love) => {
    mapStore.genImg(love)
  }

const handlePanEnd = (event, el) => {
  el.classList.remove('moving');

  tinderContainer.value.classList.remove('tinder_love', 'tinder_nope');

  const moveOutWidth = document.body.clientWidth;
  const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

  if (!keep) {
    const endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
    const toX = event.deltaX > 0 ? endX : -endX;
    const endY = Math.abs(event.velocityY) * moveOutWidth;
    const toY = event.deltaY > 0 ? endY : -endY;
    const xMulti = event.deltaX * 0.03;
    const yMulti = event.deltaY / 80;
    const rotate = xMulti * yMulti;

    el.style.transform = `translate(${toX}px, ${toY + event.deltaY}px) rotate(${rotate}deg)`;
    el.classList.add('removed');

    // Update store based on swipe direction
    const index = [...cardRefs.value].indexOf(el);
    if (toX > 0) {
      mapStore.addToLove(index);
    } else {
      mapStore.addToNope(index);
    }
  } else {
    el.style.transform = '';
  }

  initCards();
};

const handleButtonAction = (love) => {
  const cardsArray = cardRefs.value.filter(card => !card.classList.contains('removed'));
  const moveOutWidth = document.body.clientWidth * 1.5;

  if (!cardsArray.length) return;

  const card = cardsArray[0];
  card.classList.add('removed');

  const index = [...cardRefs.value].indexOf(card);
  if (love) {
    card.style.transform = `translate(${moveOutWidth}px, -100px) rotate(-30deg)`;
    mapStore.addToLove(index);
  } else {
    card.style.transform = `translate(-${moveOutWidth}px, -100px) rotate(30deg)`;
    mapStore.addToNope(index);
  }

  initCards();
};

const handleNopeClick = () => handleButtonAction(false);
const handleLoveClick = () => handleButtonAction(true);

onMounted(() => {
  mapStore.loadFeatures().then(() => {
    initCards();
    cardRefs.value = tinderContainer.value.querySelectorAll('.tinder--card');

    cardRefs.value.forEach(el => {
      const hammer = new Hammer(el);

      hammer.on('pan', event => handlePan(event, el));
      hammer.on('panend', event => handlePanEnd(event, el));
    });

  });
});
</script>

<style scoped>
.tinder {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

@media (orientation: landscape) {
  .tinder--cards {
    padding-top: 58em;
  }
}
</style>
