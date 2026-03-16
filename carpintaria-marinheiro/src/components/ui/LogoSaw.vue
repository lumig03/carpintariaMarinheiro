<script setup>
import { computed } from 'vue'

const props = defineProps({
  light:    { type: Boolean, default: false },
  size:     { type: Number,  default: 44 },
  spinning: { type: Boolean, default: false }, // continuous spin
})

const c     = computed(() => props.light ? 'white' : '#2D2D2D')
const inner = computed(() => props.light ? '#1a1a1a' : 'white')
const teeth = Array.from({ length: 18 }, (_, i) => i * 20)
const rays  = Array.from({ length: 8  }, (_, i) => i * 45)
</script>

<template>
  <svg
    :width="size" :height="size"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    class="logo-saw flex-shrink-0"
    :class="spinning ? 'saw-spin' : 'saw-hover'"
    :style="{ display:'block', cursor:'pointer' }"
  >
    <!-- 18 dentes triangulares -->
    <polygon
      v-for="deg in teeth" :key="`t${deg}`"
      points="50,2 46,14 54,14"
      :fill="c"
      :transform="`rotate(${deg},50,50)`"
    />
    <!-- Disco principal -->
    <circle cx="50" cy="50" r="40" :fill="c" />
    <!-- 8 raios brancos -->
    <line
      v-for="deg in rays" :key="`r${deg}`"
      x1="50" y1="25" x2="50" y2="13"
      :stroke="inner"
      stroke-width="3.5"
      stroke-linecap="round"
      :transform="`rotate(${deg},50,50)`"
    />
    <!-- Anel interior -->
    <circle cx="50" cy="50" r="22" :fill="inner" />
    <!-- Disco interior -->
    <circle cx="50" cy="50" r="19" :fill="c"   />
    <!-- Buraco central -->
    <circle cx="50" cy="50" r="8"   :fill="inner" />
    <circle cx="50" cy="50" r="5"   :fill="c"     />
    <circle cx="50" cy="50" r="2.5" :fill="inner" />
    <!-- Triângulos terracota -->
    <polygon points="4,44 4,56 13,50"   fill="#8C5331" />
    <polygon points="96,44 96,56 87,50" fill="#8C5331" />
  </svg>
</template>

<style scoped>
@keyframes spin-slow {
  from { transform: rotate(0deg);   }
  to   { transform: rotate(360deg); }
}
@keyframes spin-fast {
  from { transform: rotate(0deg);   }
  to   { transform: rotate(360deg); }
}

.saw-spin {
  animation: spin-slow 8s linear infinite;
  transform-origin: center;
}
.saw-hover {
  transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: center;
}
/* Parent hover triggers rotation */
button:hover > .saw-hover,
a:hover > .saw-hover,
.logo-trigger:hover .saw-hover {
  transform: rotate(45deg);
}
</style>
