<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface UserData {
  name: string
  email: string
  timestamp: string
}

const userData = ref<UserData[]>([])

const loadUserData = () => {
  const storedData = localStorage.getItem('optInUserData')
  if (storedData) {
    userData.value = JSON.parse(storedData)
  }
}

const downloadUserData = () => {
  const dataStr = JSON.stringify(userData.value, null, 2)
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)

  const exportFileDefaultName = 'user_data.json'

  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', exportFileDefaultName)
  linkElement.click()
}

const clearUserData = () => {
  if (confirm('Are you sure you want to clear all user data? This action cannot be undone.')) {
    localStorage.removeItem('optInUserData')
    userData.value = []
  }
}

onMounted(() => {
  loadUserData()
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Admin Dashboard</h1>

    <div class="mb-6">
      <button @click="downloadUserData"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
        Download User Data
      </button>
      <button @click="clearUserData" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Clear User Data
      </button>
    </div>

    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 class="text-xl font-semibold mb-4">Stored User Data</h2>
      <div v-if="userData.length === 0" class="text-gray-500">
        No user data available.
      </div>
      <div v-else class="overflow-x-auto">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in userData" :key="index">
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {{ user.name }}
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {{ user.email }}
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {{ user.timestamp }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
```