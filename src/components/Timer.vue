<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

const props = defineProps<{
  duration: number
  onTimeUp: () => void
  key: number // Add this prop to force re-render
}>()

const timeLeft = ref(props.duration)
const intervalId = ref<number | null>(null)

const strokeDasharray = computed(() => {
  const circumference = 2 * Math.PI * 20 // 20 is the new radius of our circle (half of 40)
  return `${circumference} ${circumference}`
})

const strokeDashoffset = computed(() => {
  const circumference = 2 * Math.PI * 20 // Update this to 20 as well
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
  }, 1000)
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
    <svg width="50" height="50" viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="none" stroke="#ffffff" stroke-width="2" stroke-opacity="0.3" />
      <circle cx="25" cy="25" r="20" fill="none" stroke="#ffffff" stroke-width="2" :stroke-dasharray="strokeDasharray"
        :stroke-dashoffset="strokeDashoffset" transform="rotate(-90 25 25)" />
      <text x="25" y="25" text-anchor="middle" dy="4" font-size="12" fill="#ffffff">
        {{ timeLeft }}
      </text>
    </svg>
  </div>
</template>

<style scoped>
.circular-timer {
  position: fixed;
  bottom: 10px; /* Reduced from 20px */
  left: 50%;
  transform: translateX(-50%);
}

circle {
  transition: stroke-dashoffset 0.5s linear;
}
</style>