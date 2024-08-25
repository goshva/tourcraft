<template>
  <div
    class="tinder--card"
    :style="{
      background: card.background || '',
      zIndex: zIndex
    }"
    ref="cardRef"
  >
    <p v-if="card.content.text">{{ card.content.text }}</p>
    <img :src="imgSrc || `./500x240.png`" alt="Card image" />

    <!-- Display constructed Yandex Maps link -->
    <a :href="yandexMapLink" target="_blank">Open in Yandex Maps</a>

    <h3>{{ card.title }}</h3>
    <p v-if="card.content.text">{{ card.content.text }}</p>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import Hammer from 'hammerjs';
import { useMapStore } from '../stores/useMapStore';  // Ensure the path to your store is correct

// Props from parent
const props = defineProps({
  card: Object,
  index: Number,
  zIndex: Number
});

// Reference to the card DOM element
const cardRef = ref(null);

// Use the map store
const mapStore = useMapStore();

// Fetch panorama image source based on coordinates
const imgSrc = computed(() => {
  if (!props.card.coordinates || props.card.coordinates.length !== 2) {
    return '../500x240.png'; // Return a default placeholder image if coordinates are not valid
  }

  const [lng, lat] = props.card.coordinates;
  const coordinatesString = `${lng.toFixed(6)}%2C${lat.toFixed(6)}`;
  // Call the store action to get panorama source
  return mapStore.getPanoramasSrc(coordinatesString);
});

// Computed property to construct Yandex Maps link using card coordinates
const yandexMapLink = computed(() => {
  if (!props.card.coordinates || props.card.coordinates.length !== 2) {
    return '#'; // Return a default link if coordinates are not valid
  }

  const [lng, lat] = props.card.coordinates;

  // Construct Yandex Maps URL
  return `https://yandex.ru/maps/?ll=${lng}%2C${lat}&z=16&mode=search&sll=${lng}%2C${lat}&text=${encodeURIComponent(props.card.title || 'Location')}`;
});

// Emit events for pan and panend
const emit = defineEmits(['pan', 'panend']);

onMounted(() => {
  const hammer = new Hammer(cardRef.value);
  hammer.on('pan', event => emit('pan', event, cardRef.value));
  hammer.on('panend', event => emit('panend', event, cardRef.value));
});
</script>

<style scoped>
/* Card styling */
</style>
