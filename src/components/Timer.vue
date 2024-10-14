<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

const props = defineProps<{
  duration: number
  onTimeUp: () => void
  key: number 
}>()

const timeLeft = ref(props.duration)
const intervalId = ref<NodeJS.Timeout | null>(null)

const strokeDasharray = computed(() => {
  const circumference = 2 * Math.PI * 36 
  return `${circumference} ${circumference}`
})

const strokeDashoffset = computed(() => {
  const circumference = 2 * Math.PI * 36 
  const progress = 1 - timeLeft.value / props.duration
  return circumference * progress
})


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
    <svg width="90" height="90" viewBox="0 0 180 180"> <!-- Increased from 60x60 to 90x90 -->
      <circle cx="45" cy="45" r="36" fill="none" stroke="#ffffff" stroke-width="3" stroke-opacity="0.3" /> <!-- Updated cx, cy, r, and stroke-width -->
      <circle cx="45" cy="45" r="36" fill="none" stroke="#ffffff" stroke-width="3" :stroke-dasharray="strokeDasharray"
        :stroke-dashoffset="strokeDashoffset" transform="rotate(-90 45 45)" /> <!-- Updated cx, cy, r, stroke-width, and transform -->
      <text x="45" y="45" text-anchor="middle" dy="7" font-size="21" fill="#ffffff"> <!-- Updated x, y, dy, and font-size -->
        {{ timeLeft }}
      </text>
    </svg>
  </div>
</template>

<style scoped>
.circular-timer {
  position: absolute;
  top: 0px;
  left: 40px;
}

circle {
  transition: stroke-dashoffset 0.5s linear;
}
</style>