<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface UserData {
  id?: number
  nom: string
  prenom: string
  email: string
  telephone: string
  consentMarketing: boolean
  timestamp: string
}

const userData = ref<UserData[]>([])
let db: IDBDatabase

onMounted(() => {
  initDB()
})

const initDB = () => {
  const request = indexedDB.open('OptInDatabase', 3)  // Make sure this matches the version in your form
  request.onerror = (event) => {
    console.error("Erreur IndexedDB:", event)
  }
  request.onsuccess = (event) => {
    db = (event.target as IDBOpenDBRequest).result
    loadUserData()
  }
  request.onupgradeneeded = (event) => {
    db = (event.target as IDBOpenDBRequest).result
    const store = db.createObjectStore('submissions', { keyPath: 'id', autoIncrement: true })
    store.createIndex('email', 'email', { unique: false })
    store.createIndex('telephone', 'telephone', { unique: false })
    store.createIndex('consentMarketing', 'consentMarketing', { unique: false })
  }
}

const loadUserData = () => {
  const transaction = db.transaction(['submissions'], 'readonly')
  const store = transaction.objectStore('submissions')
  const request = store.getAll()

  request.onerror = (event) => {
    console.error("Erreur lors du chargement des données:", event)
  }
  request.onsuccess = () => {
    userData.value = request.result
  }
}

const downloadUserData = () => {
  const dataStr = JSON.stringify(userData.value, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'donnees_utilisateurs.json'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

const clearUserData = () => {
  if (confirm('Êtes-vous sûr de vouloir effacer toutes les données utilisateur ? Cette action ne peut pas être annulée.')) {
    const transaction = db.transaction(['submissions'], 'readwrite')
    const store = transaction.objectStore('submissions')
    const request = store.clear()

    request.onerror = (event) => {
      console.error("Erreur lors de l'effacement des données:", event)
    }
    request.onsuccess = () => {
      userData.value = []
      console.log("Toutes les données ont été effacées avec succès")
    }
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Tableau de Bord Administrateur</h1>

    <div class="mb-6">
      <button @click="downloadUserData"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
        Télécharger les Données Utilisateur
      </button>
      <button @click="clearUserData" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Effacer les Données Utilisateur
      </button>
    </div>

    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 class="text-xl font-semibold mb-4">Données Utilisateur Stockées</h2>
      <div v-if="userData.length === 0" class="text-gray-500">
        Aucune donnée utilisateur disponible.
      </div>
      <div v-else class="overflow-x-auto">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nom
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Prénom
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Téléphone
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Consentement Marketing
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Horodatage
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in userData" :key="user.id">
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {{ user.nom }}
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {{ user.prenom }}
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {{ user.email }}
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {{ user.telephone }}
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {{ user.consentMarketing ? 'Oui' : 'Non' }}
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