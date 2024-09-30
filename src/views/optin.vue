<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import * as z from 'zod'
import Airtable from 'airtable'

const router = useRouter()
const submissionStatus = ref('')
const hasSubmitted = ref(false)

// Initialize Airtable
const base = new Airtable({ apiKey: import.meta.env.VITE_AIR_TABLE_API_KEY }).base(import.meta.env.VITE_AIR_TABLE_BASE_ID as string)

const formSchema = z.object({
  nom: z.string().min(2, 'Le nom doit comporter au moins 2 caractères'),
  prenom: z.string().min(2, 'Le prénom doit comporter au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  telephone: z.string().regex(/^0[1-9]([\s.-]?[0-9]{2}){4}$/, 'Numéro de téléphone invalide (format: 0677849988 ou 06 77 84 99 88)'),
  consentMarketing: z.boolean().refine(value => value === true, {
    message: 'Vous devez accepter de recevoir des communications marketing'
  })
})


interface FormValues {
  [key: string]: string | boolean;
}

const values = ref<FormValues>({});
const fieldLabels: Record<string, any> = {
  nom: 'Nom',
  prenom: 'Prénom',
  email: 'Email',
  telephone: 'Téléphone',
  consentMarketing: false
}

const fieldPlaceholders: Record<string, string> = {
  nom: 'Entrez votre nom',
  prenom: 'Entrez votre prénom',
  email: 'Entrez votre adresse email',
  telephone: 'Entrez votre numéro de téléphone'
}

const errors = ref<Partial<Record<keyof FormValues, string>>>({})

let db: IDBDatabase

onMounted(() => {
  const request = indexedDB.open('OptInDatabase', 3)  // Keep the version number
  request.onerror = (event) => {
    console.error("Erreur IndexedDB:", event)
  }
  request.onsuccess = (event) => {
    db = (event.target as IDBOpenDBRequest).result
  }
  request.onupgradeneeded = (event) => {
    db = (event.target as IDBOpenDBRequest).result
    if (!db.objectStoreNames.contains('submissions')) {
      const store = db.createObjectStore('submissions', { keyPath: 'id', autoIncrement: true })
      store.createIndex('email', 'email', { unique: false })
      store.createIndex('telephone', 'telephone', { unique: false })
      store.createIndex('consentMarketing', 'consentMarketing', { unique: false })
    }
  }
})

const saveLocally = (values: any) => {
  const now = new Date()
  const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

  const userData = {
    ...values,
    timestamp: formattedDate,
  }

  const transaction = db.transaction(['submissions'], 'readwrite')
  const store = transaction.objectStore('submissions')
  const request = store.add(userData)

  request.onerror = (event) => {
    console.error("Erreur lors de la sauvegarde locale des données:", event)
  }
  request.onsuccess = () => {
    console.log("Données sauvegardées localement")
  }
}

const saveToAirtable = async (values: any) => {
  try {
    const now = new Date()
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

    await base('Table 1').create([
      {
        fields: {
          Nom: values.nom,
          Prenom: values.prenom,
          Email: values.email,
          Telephone: values.telephone,
          ConsentMarketing: values.consentMarketing,
          Timestamp: formattedDate,
        },
      },
    ])
  } catch (error) {
    console.error('Erreur lors de la sauvegarde sur Airtable:', error)
  }
}

const validateForm = (): boolean => {
  hasSubmitted.value = true
  errors.value = {}
  try {
    formSchema.parse(values.value)
    return true
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        if (err.path) {
          errors.value[err.path[0] as keyof FormValues] = err.message
        }
      })
    }
    return false
  }
}

const onSubmit = async () => {
  if (validateForm()) {
    // Always save locally
    saveLocally(values.value)

    // Attempt to save to Airtable
    try {
      await saveToAirtable(values.value)
      submissionStatus.value = 'Soumission enregistrée avec succès !'
    } catch (error) {
      console.error('Erreur lors de la sauvegarde sur Airtable:', error)
      submissionStatus.value = 'Sauvegardé localement. Échec de la sauvegarde sur Airtable.'
    }

    // Reset form
    values.value = {
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      consentMarketing: false
    }
    hasSubmitted.value = false

    setTimeout(() => {
      submissionStatus.value = ''
      router.push('/')
    }, 2000)
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-sky-800 text-slate-50">
    <div class="w-full max-w-[800px] flex flex-col items-center">
      <h1 class="text-2xl font-bold text-center mb-1">Félicitations ! Vous êtes arrivé à la fin !</h1>
      <h3 class="text-xl font-bold text-center mb-6">Entrez vos coordonnées et tentez de gagner un prix !</h3>
      <form @submit.prevent="onSubmit" class="w-full flex flex-col gap-5 max-w-[600px]">
        <div v-for="field in ['nom', 'prenom', 'email', 'telephone']" :key="field" class="flex flex-col">
          <label :for="field" class="mb-1">{{ fieldLabels[field] }}</label>
          <input :id="field" v-model="values[field]" :type="field === 'email' ? 'email' : 'text'"
            :placeholder="fieldPlaceholders[field]" class="p-2 rounded text-sky-800" />
          <p class="text-sm text-sky-50 mt-1">{{ field === 'telephone' ? 'Entrez votre numéro de téléphone (format: 0677849988 ou 06 77 84 99 88)' : `Entrez votre ${fieldLabels[field].toLowerCase()}` }}</p>
          <p v-if="hasSubmitted && errors[field]" class="text-sm text-red-400 mt-1">{{ errors[field] }}</p>
        </div>
        <div class="flex items-start space-x-3 rounded-md border p-4 text-sky-800">
          <input id="consentMarketing" v-model="values.consentMarketing" type="checkbox" class="mt-1" />
          <div class="space-y-1 leading-none">
            <label for="consentMarketing" class="text-sky-50 font-bold">
              J'accepte de recevoir des communications marketing de [Nom du Salon] et de ses partenaires, y compris
              Volkswagen.
            </label>
            <p class="text-sm text-sky-50">
              Vous pouvez vous désabonner à tout moment. Veuillez lire notre Politique de Confidentialité pour plus
              d'informations.
            </p>
          </div>
        </div>
        <p v-if="hasSubmitted && errors.consentMarketing" class="text-sm text-red-400 mt-1">{{ errors.consentMarketing
          }}</p>
        <button type="submit" class="bg-blue-500 text-white p-2 rounded">
          Soumettre
        </button>
      </form>
      <p v-if="submissionStatus" class="mt-4 text-green-400">{{ submissionStatus }}</p>
    </div>
  </div>
</template>