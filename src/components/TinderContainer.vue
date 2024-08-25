<template>
    <div class="tinder" ref="tinderContainer">
        <div class="tinder--status">
            <i class="fa fa-remove"></i>
            <i class="fa fa-heart"></i>
        </div>
        <div class="tinder--cards">
            <TinderCard v-for="(card, index) in mapStore.features" :key="index" :card="card" :index="index"
                :z-index="mapStore.features.length - index" ref="cardRefs" @pan="handlePan" @panend="handlePanEnd" />
        </div>
        <TinderButtons @nope="handleNopeClick" @love="handleLoveClick" @upload="handleImageUploader" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TinderCard from './TinderCard.vue';
import TinderButtons from './TinderButtons.vue';
import { useMapStore } from '../stores/useMapStore';
import Hammer from 'hammerjs';

const mapStore = useMapStore();
const tinderContainer = ref(null);
const cardRefs = ref([]);

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
    // Convert NodeList to an array
    const cardsArray = [...cardRefs.value].filter(card => !card.classList.contains('removed'));
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

const handleImageUploader = (love) => {
    mapStore.genImg(love);
};

onMounted(() => {
    mapStore.loadPanoramasSrc().then(() => {
        mapStore.loadFeatures().then(() => {
            initCards();
            cardRefs.value = tinderContainer.value.querySelectorAll('.tinder--card');

            cardRefs.value.forEach(el => {
                const hammer = new Hammer(el);
                hammer.on('pan', event => handlePan(event, el));
                hammer.on('panend', event => handlePanEnd(event, el));
            });
        });
    })

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