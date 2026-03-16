<script setup>
import { ref, reactive } from 'vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseTextarea from '@/components/ui/BaseTextarea.vue'
import { submitContactForm } from '@/services/contactService'
import company from '@/data/companyData'

const projectTypes = [
  'Cozinha por Medida',
  'Roupeiro / Closet',
  'Móvel de Casa de Banho',
  'Mobiliário de Quarto',
  'Armário Embutido',
  'Móvel TV / Painel Decorativo',
  'Mobiliário Personalizado',
  'Outro',
]

const form = reactive({
  name: '',
  phone: '',
  email: '',
  locality: '',
  projectType: '',
  message: '',
  rgpd: false,
})

const errors = reactive({})
const submitting = ref(false)
const submitted = ref(false)
const submitError = ref('')

function validate() {
  const e = {}
  if (!form.name.trim()) e.name = 'O nome é obrigatório.'
  if (!form.phone.trim()) {
    e.phone = 'O telefone é obrigatório.'
  } else if (!/^[+\d\s()-]{9,}$/.test(form.phone)) {
    e.phone = 'Número de telefone inválido.'
  }
  if (!form.email.trim()) {
    e.email = 'O email é obrigatório.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    e.email = 'Endereço de email inválido.'
  }
  if (!form.projectType) e.projectType = 'Selecione o tipo de projeto.'
  if (!form.message.trim() || form.message.length < 10) e.message = 'Descreva brevemente o seu projeto (mínimo 10 caracteres).'
  if (!form.rgpd) e.rgpd = 'Deve aceitar a política de privacidade.'
  Object.assign(errors, e)
  return Object.keys(e).length === 0
}

async function handleSubmit() {
  Object.keys(errors).forEach(k => delete errors[k])
  if (!validate()) return
  submitting.value = true
  submitError.value = ''
  try {
    await submitContactForm({ ...form })
    submitted.value = true
  } catch (err) {
    submitError.value = 'Ocorreu um erro ao enviar o pedido. Por favor tente novamente ou contacte-nos por telefone.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <!-- Success state -->
  <div v-if="submitted" class="py-16 text-center">
    <div class="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
      <svg width="32" height="32" fill="none" stroke="#8A6546" stroke-width="1.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    </div>
    <h3 class="font-heading text-2xl text-brand-charcoal mb-3">Pedido enviado com sucesso!</h3>
    <p class="font-body text-brand-charcoal/60 mb-8 max-w-md mx-auto">
      Obrigado pelo seu contacto. Entraremos em contacto brevemente para perceber o seu projeto.
    </p>
    <button
      @click="submitted = false; Object.assign(form, { name:'', phone:'', email:'', locality:'', projectType:'', message:'', rgpd: false })"
      class="btn-outline"
    >
      Novo pedido
    </button>
  </div>

  <!-- Form -->
  <form
    v-else
    @submit.prevent="handleSubmit"
    novalidate
    class="space-y-8"
    name="orcamento"
    data-netlify="true"
  >
    <!-- Hidden field for Netlify -->
    <input type="hidden" name="form-name" value="orcamento" />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <BaseInput
        v-model="form.name"
        label="Nome Completo"
        placeholder="O seu nome"
        :error="errors.name"
        required
      />
      <BaseInput
        v-model="form.phone"
        label="Telefone"
        type="tel"
        placeholder="+351 910 000 000"
        :error="errors.phone"
        required
      />
      <BaseInput
        v-model="form.email"
        label="Email"
        type="email"
        placeholder="email@exemplo.pt"
        :error="errors.email"
        required
      />
      <BaseInput
        v-model="form.locality"
        label="Localidade"
        placeholder="Ex: Ponte de Lima"
        :error="errors.locality"
      />
    </div>

    <!-- Project type -->
    <div>
      <label class="form-label">Tipo de Projeto <span class="text-brand-orange">*</span></label>
      <div class="flex flex-wrap gap-2 mt-2">
        <button
          v-for="type in projectTypes"
          :key="type"
          type="button"
          @click="form.projectType = type"
          :class="[
            'px-4 py-2 font-body text-xs font-medium transition-all duration-200',
            form.projectType === type
              ? 'bg-brand-dark text-white'
              : 'bg-brand-beige text-brand-charcoal/60 hover:bg-sand hover:text-brand-charcoal'
          ]"
        >
          {{ type }}
        </button>
      </div>
      <p v-if="errors.projectType" class="mt-2 text-xs text-red-500 font-body">{{ errors.projectType }}</p>
    </div>

    <BaseTextarea
      v-model="form.message"
      label="Descrição do Projeto"
      placeholder="Descreva o seu projeto — divisão, dimensões aproximadas, estilo, prazo ou qualquer informação relevante…"
      :rows="5"
      :error="errors.message"
      required
    />

    <!-- RGPD -->
    <div>
      <label class="flex gap-3 cursor-pointer group">
        <div class="relative flex-shrink-0 mt-0.5">
          <input
            v-model="form.rgpd"
            type="checkbox"
            class="peer sr-only"
          />
          <div
            :class="[
              'w-5 h-5 border transition-colors duration-200',
              form.rgpd ? 'bg-brand-dark border-brand-charcoal' : 'bg-transparent border-brand-charcoal/30 group-hover:border-brand-charcoal/60'
            ]"
          >
            <svg
              v-if="form.rgpd"
              class="w-full h-full text-white p-0.5"
              fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
            </svg>
          </div>
        </div>
        <span class="font-body text-sm text-brand-charcoal/60 leading-relaxed">
          Concordo com o tratamento dos meus dados pessoais para resposta a este pedido de orçamento, de acordo com a política de privacidade da Carpintaria Marinheiro.
        </span>
      </label>
      <p v-if="errors.rgpd" class="mt-2 text-xs text-red-500 font-body">{{ errors.rgpd }}</p>
    </div>

    <!-- Error message -->
    <p v-if="submitError" class="font-body text-sm text-red-500 bg-red-50 p-4">{{ submitError }}</p>

    <button
      type="submit"
      class="btn-primary w-full md:w-auto"
      :disabled="submitting"
    >
      <span v-if="submitting" class="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      {{ submitting ? 'A enviar...' : 'Enviar Pedido de Orçamento' }}
    </button>
  </form>
</template>
