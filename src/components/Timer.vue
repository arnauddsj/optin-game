<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

const props = defineProps<{
  duration: number
  onTimeUp: () => void
  key: number // Add this prop to force re-render
}>()

const timeLeft = ref(props.duration)
const intervalId = ref<NodeJS.Timeout | null>(null)

const strokeDasharray = computed(() => {
  const circumference = 2 * Math.PI * 24 // Increased from 20 to 24 (20 * 1.2)
  return `${circumference} ${circumference}`
})

const strokeDashoffset = computed(() => {
  const circumference = 2 * Math.PI * 24 // Increased from 20 to 24 (20 * 1.2)
  const progress = 1 - timeLeft.value / props.duration
  return circumference * progress
})

// Watch for changes in the key prop to reset the timer
watch(() => props.key, () => {
  timeLeft.value = props.duration
  if (intervalId.value) {
    clearInterval(intervalId.value)
  }
  startTimer()
})

const startTimer = () => {
  intervalId.value = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(intervalId.value!)
      props.onTimeUp()
    }
  }, 1000) as NodeJS.Timeout
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
  }
})
</script>

<template>
  <div class="circular-timer">
    <svg width="60" height="60" viewBox="0 0 60 60"> <!-- Increased from 50x50 to 60x60 -->
      <circle cx="30" cy="30" r="24" fill="none" stroke="#ffffff" stroke-width="2" stroke-opacity="0.3" /> <!-- Updated cx, cy, and r -->
      <circle cx="30" cy="30" r="24" fill="none" stroke="#ffffff" stroke-width="2" :stroke-dasharray="strokeDasharray"
        :stroke-dashoffset="strokeDashoffset" transform="rotate(-90 30 30)" /> <!-- Updated cx, cy, r, and transform -->
      <text x="30" y="30" text-anchor="middle" dy="5" font-size="14" fill="#ffffff"> <!-- Updated x, y, dy, and font-size -->
        {{ timeLeft }}
      </text>
    </svg>
  </div>
</template>

<style scoped>
.circular-timer {
  position: fixed;
  bottom: 12px; /* Increased from 10px to 12px */
  left: 50%;
  transform: translateX(-50%);
}

circle {
  transition: stroke-dashoffset 0.5s linear;
}
</style>