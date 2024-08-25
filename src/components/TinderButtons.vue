<template>
    <div class="tinder--buttons">
      <button id="nope" @click="$emit('nope')">
        <i class="fa fa-trash"></i>{{ nopeCount }}
      </button>
      <button id="love" @click="$emit('love')">
        <i class="fa fa-heart-o"></i>{{ loveCount }}
      </button>
      <button id="upload" @click="$emit('upload', 'Особняк князя Дондукова-Корсакова')">
        <i class="fa fa-photo"></i>
      </button>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    nopeCount: Number,
    loveCount: Number
  });
  </script>
  
  <style scoped>
  /* Buttons styling */
  </style>
  