<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

import * as z from 'zod'

const router = useRouter()

const formSchema = toTypedSchema(z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
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
    form.resetForm()
    router.push('/')
  } catch (error) {
    console.error('Error submitting form:', error)
  }
})
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md">
      <h2 class="text-3xl font-bold text-center mb-6">Enter Your Details</h2>
      <Form @submit="onSubmit" class="space-y-8">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input v-bind="componentField" placeholder="Your name" />
            </FormControl>
            <FormDescription>
              Enter your full name.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input v-bind="componentField" type="email" placeholder="your.email@example.com" />
            </FormControl>
            <FormDescription>
              Enter your email address.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit" :disabled="form.isSubmitting">
          {{ form.isSubmitting ? 'Submitting...' : 'Submit' }}
        </Button>
      </Form>
    </div>
  </div>
</template>
```