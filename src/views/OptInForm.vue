<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import * as z from 'zod'
import Airtable from 'airtable'

const router = useRouter()
const submissionStatus = ref('')
// Initialize Airtable
const base = new Airtable({ apiKey: import.meta.env.VITE_AIR_TABLE_API_KEY }).base(import.meta.env.VITE_AIR_TABLE_BASE_ID as string)

const formSchema = toTypedSchema(z.object({
  nom: z.string().min(2, 'Le nom doit comporter au moins 2 caractères'),
  prenom: z.string().min(2, 'Le prénom doit comporter au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  telephone: z.string().regex(/^0[1-9]([\s.-]?[0-9]{2}){4}$/, 'Numéro de téléphone invalide (format: 0677849988 ou 06 77 84 99 88)'),
  consentMarketing: z.boolean().refine(value => value === true, {
    message: 'Vous devez accepter de recevoir des communications marketing'
  })
}))

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
})

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

const onSubmit = handleSubmit(async (values) => {
  // Always save locally
  saveLocally(values)

  // Attempt to save to Airtable
  try {
    await saveToAirtable(values)
    submissionStatus.value = 'Soumission enregistrée avec succès !'
  } catch (error) {
    console.error('Erreur lors de la sauvegarde sur Airtable:', error)
    submissionStatus.value = 'Sauvegardé localement. Échec de la sauvegarde sur Airtable.'
  }

  resetForm()
  setTimeout(() => {
    submissionStatus.value = ''
    router.push('/')
  }, 2000)
})
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-sky-800 text-slate-50">
    <div class="w-full max-w-[800px] flex flex-col items-center">
      <h1 class="text-2xl font-bold text-center mb-1">Félicitations ! Vous êtes arrivé à la fin !</h1>
      <h3 class="text-xl font-bold text-center mb-6">Entrez vos coordonnées et tentez de gagner un prix !</h3>
      <form @submit="onSubmit" class="w-full flex flex-col gap-5 max-w-[600px]">
        <FormField v-slot="{ field }" name="nom">
          <FormItem>
            <FormLabel>Nom</FormLabel>
            <FormControl>
              <Input v-bind="field" placeholder="Votre nom" />
            </FormControl>
            <FormDescription>
              Entrez votre nom de famille.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ field }" name="prenom">
          <FormItem>
            <FormLabel>Prénom</FormLabel>
            <FormControl>
              <Input v-bind="field" placeholder="Votre prénom" />
            </FormControl>
            <FormDescription>
              Entrez votre prénom.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ field }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input v-bind="field" type="email" placeholder="votre.email@example.com" />
            </FormControl>
            <FormDescription>
              Entrez votre adresse email.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ field }" name="telephone">
          <FormItem>
            <FormLabel>Numéro de téléphone</FormLabel>
            <FormControl>
              <Input v-bind="field" placeholder="0677849988" />
            </FormControl>
            <FormDescription>
              Entrez votre numéro de téléphone (format: 0677849988 ou 06 77 84 99 88).
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ field }" name="consentMarketing">
          <FormItem class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox :checked="field.value" @update:checked="(checked) => field.onChange(checked)" />
            </FormControl>
            <div class="space-y-1 leading-none">
              <FormLabel>
                J'accepte de recevoir des communications marketing de [Nom du Salon] et de ses partenaires, y compris
                Volkswagen.
              </FormLabel>
              <FormDescription>
                Vous pouvez vous désabonner à tout moment. Veuillez lire notre Politique de Confidentialité pour plus
                d'informations.
              </FormDescription>
            </div>
          </FormItem>
        </FormField>
        <Button type="submit">
          Soumettre
        </Button>
      </form>
      <p v-if="submissionStatus" class="mt-4 text-green-400">{{ submissionStatus }}</p>
    </div>
  </div>
</template>