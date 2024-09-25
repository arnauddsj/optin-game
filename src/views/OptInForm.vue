<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import * as z from 'zod'

const router = useRouter()

const formSchema = toTypedSchema(z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
}))

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  try {
    // Simulating API call to Airtable
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Save to localStorage
    const userData = {
      ...values,
      timestamp: new Date().toISOString(),
    }
    const storedData = localStorage.getItem('optInUserData')
    const updatedData = storedData ? [...JSON.parse(storedData), userData] : [userData]
    localStorage.setItem('optInUserData', JSON.stringify(updatedData))

    // Reset form and redirect
    resetForm()
    router.push('/')
  } catch (error) {
    console.error('Error submitting form:', error)
  }
})
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-sky-800 text-slate-50">
    <div class="w-full max-w-[800px] flex flex-col items-center">
      <h1 class="text-2xl font-bold text-center mb-1">Congrats! You've made it to the end!</h1>
      <h3 class="text-xl font-bold text-center mb-6">Enter Your Details and have a chance to win a prize!</h3>
      <form @submit="onSubmit" class="w-full flex flex-col gap-5 max-w-[600px]">
        <FormField v-slot="{ field }" name="name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input v-bind="field" placeholder="Your name" />
            </FormControl>
            <FormDescription>
              Enter your full name.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ field }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input v-bind="field" type="email" placeholder="your.email@example.com" />
            </FormControl>
            <FormDescription>
              Enter your email address.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit">
          Submit
        </Button>
      </form>
    </div>
  </div>
</template>