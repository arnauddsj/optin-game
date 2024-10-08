<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import * as z from 'zod'
import Airtable from 'airtable'
import { useGameStore } from '@/stores/gameStore'
import PublicLayout from '@/layouts/PublicLayout.vue'
import LegalDialog from '@/components/LegalDialog.vue'
import { useMotion } from '@vueuse/motion'

const router = useRouter()
const submissionStatus = ref('')
const hasSubmitted = ref(false)
const isSaving = ref(false)


const base = new Airtable({ apiKey: import.meta.env.VITE_AIR_TABLE_API_KEY }).base(import.meta.env.VITE_AIR_TABLE_BASE_ID as string)


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


z.setErrorMap(customErrorMap);

const formSchema = z.object({
  nom: z.string().min(2),
  prenom: z.string().min(2),
  email: z.string().email(),
  telephone: z.string().regex(/^[0-9]{10}$/, 'Le numéro de téléphone doit contenir 10 chiffres'),
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
  const request = indexedDB.open('OptInDatabase', 4)  
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
      store.createIndex('gamesWon', 'gamesWon', { unique: false })
    }
  }
})

const gameStore = useGameStore()


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

const titleRef = ref(null)
const subtitleRef = ref(null)
const submitButtonRef = ref(null)
const requiredFieldRef = ref(null)

const titleMotion = useMotion(titleRef, {
  initial: { opacity: 0, y: -20 },
  enter: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 400,
      delay: 100, 
      ease: 'easeOut' 
    } 
  },
})

const subtitleMotion = useMotion(subtitleRef, {
  initial: { opacity: 0, y: -20 },
  enter: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 400,
      delay: 200, 
      ease: 'easeOut' 
    } 
  },
})

const formFields = ref(['nom', 'prenom', 'email', 'telephone'])
const consentFields = ref(['consentData', 'consentMarketing'])

const createFieldMotion = (index: number) => ({
  initial: { opacity: 0, y: 20 },
  enter: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 400,
      delay: 300 + index * 100,
      ease: 'easeOut' 
    } 
  },
})

const createConsentMotion = (index: number) => ({
  initial: { opacity: 0, x: -20 },
  enter: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 400,
      delay: 300 + (formFields.value.length + index) * 100, 
      ease: 'easeOut' 
    } 
  },
})

const requiredFieldMotion = useMotion(requiredFieldRef, {
  initial: { opacity: 0, y: 20 },
  enter: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 400,
      delay: 300 + (formFields.value.length + consentFields.value.length) * 100, 
      ease: 'easeOut' 
    } 
  },
})

const submitButtonMotion = useMotion(submitButtonRef, {
  initial: { opacity: 0, scale: 0.9 },
  enter: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 400,
      delay: 400 + (formFields.value.length + consentFields.value.length) * 100, 
      ease: 'easeOut' 
    } 
  },
})

const onSubmit = async () => {
  if (validateForm()) {
    isSaving.value = true
    
    saveLocally(values.value)

    
    try {
      await saveToAirtable(values.value)
      submissionStatus.value = 'Participation enregistrée avec succès !'
    } catch (error) {
      console.error('Erreur lors de la sauvegarde sur Airtable:', error)
      submissionStatus.value = 'Sauvegardé localement. Échec de la sauvegarde sur Airtable.'
      isSaving.value = false
      router.push('/success-optin')
    }

    
    values.value = {
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      consentMarketing: false,
      consentData: false
    }
    hasSubmitted.value = false
    isSaving.value = false
    router.push('/success-optin')
  }
}
</script>

<template>
  <PublicLayout>
    <div class="flex flex-col justify-center gap-5 w-[80vw] px-5">
      <div class="flex flex-col gap-2">
        <h2 class="text-xl" ref="titleRef" v-motion="titleMotion">
          <span v-if="gameStore.gamesWon > 0">Félicitations !</span>
        </h2>
        <h2 class="text-xl" ref="subtitleRef" v-motion="subtitleMotion">
          Vous avez gagné {{ gameStore.gamesWon }} étape{{ gameStore.gamesWon > 1 ? 's' : '' }} sur 3. Remplissez et envoyez le formulaire
          afin d'avoir une chance d'être tiré au sort pour gagner votre lot.
        </h2>
      </div>
      <form @submit.prevent="onSubmit" class="flex flex-col gap-4 max-w-[600px]">
        <div v-for="(field, index) in formFields" :key="field" class="flex flex-col" v-motion="createFieldMotion(index)">
          <label :for="field" class="text-xs mb-[5px]">{{ fieldLabels[field] }}</label>
          <input 
            :id="field" 
            v-model="values[field]" 
            :type="field === 'email' ? 'email' : 'text'"
            :inputmode="field === 'telephone' ? 'numeric' : 'text'"
            :pattern="field === 'telephone' ? '[0-9]*' : undefined"
            :placeholder="fieldPlaceholders[field]" 
            class="p-1 text-vw-dark" 
            autocomplete="off" 
          />
          <p v-if="hasSubmitted && errors[field]" class="text-sm text-red-400 mt-1">{{ errors[field] }}</p>
        </div>
        <div class="flex flex-col space-y-4 py-4">
          <div v-for="(field, index) in consentFields" :key="field" class="flex items-start space-x-3" v-motion="createConsentMotion(index)">
            <input :id="field" v-model="values[field]" type="checkbox" class="mt-1 big-checkbox" />
            <div class="flex">
              <label :for="field" class="text-xs">
                {{ field === 'consentData' ? "J'autorise Volkswagen à traiter mes données personnelles." : "J'accepte de recevoir des communications marketing." }}
                <span v-if="field === 'consentData'" class="text-red-400 ml-1">*</span>
                <LegalDialog v-if="field === 'consentData'" class="m-0 p-0" />.
              </label>
            </div>
          </div>
          <p v-if="hasSubmitted && errors.consentData" class="text-sm text-red-400 mt-1">
            {{ errors.consentData }}
          </p>
          <p class="text-xs mt-2" ref="requiredFieldRef" v-motion="requiredFieldMotion">
            <span class="text-red-400">*</span> Champ obligatoire
          </p>
        </div>
        <div class="inline-block" ref="submitButtonRef" v-motion="submitButtonMotion">
          <button :disabled="isSaving" type="submit" class="bg-vw-light text-white text-2xl font-medium py-1 px-8">
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
  min-width: 1.5rem;
  min-height: 1.5rem;
}

</style>