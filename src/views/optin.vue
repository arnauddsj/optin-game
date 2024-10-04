<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import * as z from 'zod'
import Airtable from 'airtable'
import { useGameStore } from '@/stores/gameStore'
import PublicLayout from '@/layouts/PublicLayout.vue'

const router = useRouter()
const submissionStatus = ref('')
const hasSubmitted = ref(false)

// Initialize Airtable
const base = new Airtable({ apiKey: import.meta.env.VITE_AIR_TABLE_API_KEY }).base(import.meta.env.VITE_AIR_TABLE_BASE_ID as string)

// Add this custom error map
const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    return { message: "Veuillez renseigner ce champ" };
  }
  if (issue.code === z.ZodIssueCode.too_small) {
    return { message: `Ce champ doit comporter au moins ${issue.minimum} caractères` };
  }
  if (issue.code === z.ZodIssueCode.invalid_string) {
    if (issue.validation === "email") {
      return { message: "Adresse email invalide" };
    }
    if (issue.validation === "regex") {
      return { message: "Format invalide" };
    }
  }
  return { message: ctx.defaultError };
};

// Set the custom error map
z.setErrorMap(customErrorMap);

const formSchema = z.object({
  nom: z.string().min(2),
  prenom: z.string().min(2),
  email: z.string().email(),
  telephone: z.string().regex(/^[0-9+() ]+$/),
  consentMarketing: z.boolean().optional(),
  consentData: z.boolean().refine(value => value === true, {
    message: 'Vous devez accepter que Volkswagen puisse traiter vos données personnelles'
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
  consentMarketing: false,
  consentData: false
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
      store.createIndex('consentData', 'consentData', { unique: false })
    }
  }
})

const gameStore = useGameStore()

// Update saveLocally function
const saveLocally = (values: any) => {
  const now = new Date()
  const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

  const userData = {
    ...values,
    timestamp: formattedDate,
    'Jeux gagnés': gameStore.gamesWon,
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

// Update saveToAirtable function
const saveToAirtable = async (values: any) => {
  try {
    const now = new Date()
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

    await base('Golf').create([
      {
        fields: {
          Nom: values.nom,
          Prenom: values.prenom,
          Email: values.email,
          Telephone: values.telephone,
          ConsentMarketing: values.consentMarketing,
          ConsentData: values.consentData,
          'Jeux gagnés': gameStore.gamesWon,
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
      submissionStatus.value = 'Participation enregistrée avec succès !'
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
      consentMarketing: false,
      consentData: false
    }
    hasSubmitted.value = false

    setTimeout(() => {
      submissionStatus.value = ''
      router.push('/intro-game')
    }, 2000)
  }
}
</script>

<template>
  <PublicLayout>
    <div class="flex flex-col justify-center gap-5 w-[80vw] px-5">
      <div class="flex flex-col gap-2">
        <h2 class="text-xl"><span v-if="gameStore.gamesWon > 0">Félicitations !</span> Vous avez gagné {{ gameStore.gamesWon }} étape{{ gameStore.gamesWon > 1 ? 's' : '' }} sur 3. Remplissez et envoyez le formulaire afin d'avoir une chance d'être tiré au sort pour gagner votre lot.</h2>
      </div>
      <form @submit.prevent="onSubmit" class="flex flex-col gap-4 max-w-[600px]">
        <div v-for="field in ['nom', 'prenom', 'email', 'telephone']" :key="field" class="flex flex-col">
          <label :for="field" class="text-xs mb-[5px]">{{ fieldLabels[field] }}</label>
          <input :id="field" v-model="values[field]" :type="field === 'email' ? 'email' : 'text'"
            :placeholder="fieldPlaceholders[field]" class="p-1 text-vw-dark" autocomplete="off" />
          <p v-if="hasSubmitted && errors[field]" class="text-sm text-red-400 mt-1">{{ errors[field] }}</p>
        </div>
        <div class="flex flex-col space-y-4 py-4">
          <div class="flex items-start space-x-3">
            <input id="consentData" v-model="values.consentData" type="checkbox" class="mt-1 big-checkbox" />
            <div class="flex flex-col leading-none">
              <label for="consentData" class="text-xs">
                J'autorise Volkswagen à traiter mes données personnelles. <span class="text-red-400">*</span>
              </label>
            </div>
          </div>
          <p v-if="hasSubmitted && errors.consentData" class="text-sm text-red-400 mt-1">
            {{ errors.consentData }}
          </p>
          <div class="flex items-start space-x-3">
            <input id="consentMarketing" v-model="values.consentMarketing" type="checkbox" class="mt-1 big-checkbox" />
            <div class="flex flex-col space-y-1 leading-none">
              <label for="consentMarketing" class="text-xs">
                J'accepte de recevoir des communications marketing.
              </label>
            </div>
          </div>

          <p class="text-xs mt-2"><span class="text-red-400">*</span> Champ obligatoire</p>
        </div>
        <div class="inline-block">
          <button type="submit" class="bg-vw-light text-white text-2xl font-medium py-1 px-8">
            Envoyer
          </button>
        </div>
      </form>
      <p v-if="submissionStatus" class="mt-4 text-xl font-bold text-vw-light">{{ submissionStatus }}</p>
    </div>
  </PublicLayout>
</template>

<style scoped>
.big-checkbox {
  width: 1.5rem;
  height: 1.5rem;
}
</style>