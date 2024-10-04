<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
interface UserData {
  id?: number
  nom: string
  prenom: string
  email: string
  telephone: string
  consentMarketing: boolean
  consentData: boolean
  timestamp: string
  'Jeux gagnés': number
}

const router = useRouter()
const userData = ref<UserData[]>([])
let db: IDBDatabase

onMounted(() => {
  initDB()
})

const initDB = () => {
  const request = indexedDB.open('OptInDatabase', 4)  // Make sure this matches the version in your form
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
    console.log("Raw data from IndexedDB:", request.result)
    userData.value = request.result.map((item: any) => ({
      ...item,
      'Jeux gagnés': item['Jeux gagnés'] || 0,
    }))
    console.log("Processed userData:", userData.value)
  }
}

const downloadUserData = () => {
  const dataToDownload = userData.value.map(user => ({
    ...user,
    consentMarketing: user.consentMarketing ?? false
  }))
  const dataStr = JSON.stringify(dataToDownload, null, 2)
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
      console.log("Toutes les données ont été effaces avec succès")
    }
  }
}
</script>

<template>
  <div class="container mx-auto px-2 py-4">
    <h1 class="text-2xl font-bold mb-4">Tableau de bord Administrateur</h1>
    <div class="flex gap-2 mb-4">
      <button @click="router.push('/')"
        class="bg-vw-light text-white rounded-none font-bold py-1 px-2 text-sm">
        Retour
      </button>
      <button @click="downloadUserData"
        class="ring ring-vw-light text-vw-light rounded-none font-bold py-1 px-2 text-sm">
        Télécharger les données
      </button>
      <button @click="clearUserData" class="text-red-500 text-xs p-0 m-0 ml-2">
        Effacer les données
      </button>
    </div>

    <div class="rounded px-2 pt-4 pb-4 mb-4">
      <h2 class="text-lg font-semibold mb-2">Données Stockées</h2>
      <div v-if="userData.length === 0" class="text-sm">
        Aucune donnée disponible.
      </div>
      <div v-else class="overflow-x-auto">
        <table class="w-full leading-tight text-xs">
          <thead>
            <tr>
              <th class="p-1 border-b border-gray-200 bg-gray-100 text-left font-semibold text-gray-600 uppercase">
                Nom
              </th>
              <th class="p-1 border-b border-gray-200 bg-gray-100 text-left font-semibold text-gray-600 uppercase">
                Prénom
              </th>
              <th class="p-1 border-b border-gray-200 bg-gray-100 text-left font-semibold text-gray-600 uppercase">
                Email
              </th>
              <th class="p-1 border-b border-gray-200 bg-gray-100 text-left font-semibold text-gray-600 uppercase">
                Date
              </th>
              <th class="p-1 border-b border-gray-200 bg-gray-100 text-left font-semibold text-gray-600 uppercase">
                Jeux gagnés
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in userData" :key="user.id">
              <td class="p-1 border-b border-gray-200 bg-white text-vw-dark">
                {{ user.nom }}
              </td>
              <td class="p-1 border-b border-gray-200 bg-white text-vw-dark">
                {{ user.prenom }}
              </td>
              <td class="p-1 border-b border-gray-200 bg-white text-vw-dark">
                {{ user.email }}
              </td>
              <td class="p-1 border-b border-gray-200 bg-white text-vw-dark">
                {{ user.timestamp }}
              </td>
              <td class="p-1 border-b border-gray-200 bg-white text-vw-dark">
                {{ user['Jeux gagnés'] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>