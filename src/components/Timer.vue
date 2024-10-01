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
  const circumference = 2 * Math.PI * 40 // 40 is the radius of our circle
  return `${circumference} ${circumference}`
})

const strokeDashoffset = computed(() => {
  const circumference = 2 * Math.PI * 40
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
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill="none" stroke="#ffffff" stroke-width="4" stroke-opacity="0.3" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#ffffff" stroke-width="4" :stroke-dasharray="strokeDasharray"
        :stroke-dashoffset="strokeDashoffset" transform="rotate(-90 50 50)" />
      <text x="50" y="50" text-anchor="middle" dy="7" font-size="24" fill="#ffffff">
        {{ timeLeft }}
      </text>
    </svg>
  </div>
</template>

<style scoped>
.circular-timer {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

circle {
  transition: stroke-dashoffset 0.5s linear;
}
</style>