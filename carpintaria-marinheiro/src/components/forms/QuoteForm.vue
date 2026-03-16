<script setup>
import { ref, reactive } from 'vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseTextarea from '@/components/ui/BaseTextarea.vue'
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

const errors    = reactive({})
const submitting = ref(false)
const submitted  = ref(false)
const submitError = ref('')

function clearErrors() {
  Object.keys(errors).forEach(k => delete errors[k])
}

function validate() {
  clearErrors()
  if (!form.name.trim())   errors.name  = 'O nome é obrigatório.'
  if (!form.phone.trim()) {
    errors.phone = 'O telefone é obrigatório.'
  } else if (!/^[+\d\s\-().]{9,}$/.test(form.phone)) {
    errors.phone = 'Número de telefone inválido.'
  }
  if (!form.email.trim()) {
    errors.email = 'O email é obrigatório.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Endereço de email inválido.'
  }
  if (!form.projectType) errors.projectType = 'Selecione o tipo de projeto.'
  if (!form.message.trim() || form.message.length < 10)
    errors.message = 'Descreva brevemente o seu projeto (mínimo 10 caracteres).'
  if (!form.rgpd) errors.rgpd = 'Deve aceitar a política de privacidade.'
  return Object.keys(errors).length === 0
}

async function handleSubmit() {
  if (!validate()) return
  submitting.value = true
  submitError.value = ''

  try {
    // --- Estratégia 1: Formspree (configurar VITE_FORMSPREE_ID no .env) ---
    const formspreeId = import.meta.env.VITE_FORMSPREE_ID
    if (formspreeId) {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          nome: form.name,
          telefone: form.phone,
          email: form.email,
          localidade: form.locality,
          projeto: form.projectType,
          mensagem: form.message,
        }),
      })
      if (!res.ok) throw new Error('Formspree error')
      submitted.value = true
      return
    }

    // --- Estratégia 2: EmailJS (configurar vars no .env) ---
    const ejsService  = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const ejsTemplate = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const ejsKey      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    if (ejsService && ejsTemplate && ejsKey) {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: ejsService,
          template_id: ejsTemplate,
          user_id: ejsKey,
          template_params: { ...form },
        }),
      })
      if (!res.ok) throw new Error('EmailJS error')
      submitted.value = true
      return
    }

    // --- Estratégia 3: mailto fallback (sempre funciona) ---
    const subject = encodeURIComponent(`Pedido de Orçamento — ${form.projectType}`)
    const body = encodeURIComponent(
      `Nome: ${form.name}\nTelefone: ${form.phone}\nEmail: ${form.email}\nLocalidade: ${form.locality}\nTipo de Projeto: ${form.projectType}\n\nMensagem:\n${form.message}`
    )
    window.location.href = `mailto:${company.contact.email}?subject=${subject}&body=${body}`
    submitted.value = true

  } catch (err) {
    submitError.value = 'Ocorreu um erro ao enviar. Por favor contacte-nos directamente por telefone ou WhatsApp.'
  } finally {
    submitting.value = false
  }
}

function reset() {
  Object.assign(form, { name:'', phone:'', email:'', locality:'', projectType:'', message:'', rgpd: false })
  clearErrors()
  submitted.value = false
  submitError.value = ''
}
</script>

<template>
  <!-- ── Estado de sucesso ── -->
  <div v-if="submitted" class="py-16 text-center">
    <div class="w-16 h-16 bg-brand-orange/10 flex items-center justify-center mx-auto mb-6">
      <svg width="32" height="32" fill="none" stroke="#8C5331" stroke-width="1.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    </div>
    <h3 class="font-heading text-2xl text-brand-charcoal mb-3">Pedido enviado com sucesso!</h3>
    <p class="font-sans text-brand-gray mb-8 max-w-md mx-auto">
      Obrigado pelo seu contacto. Entraremos em contacto brevemente para perceber o seu projeto.
    </p>
    <button @click="reset" class="btn-outline">Novo pedido</button>
  </div>

  <!-- ── Formulário ── -->
  <form v-else @submit.prevent="handleSubmit" novalidate class="space-y-8">

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <BaseInput v-model="form.name"     label="Nome Completo"  placeholder="O seu nome"          :error="errors.name"  required />
      <BaseInput v-model="form.phone"    label="Telefone"       placeholder="+351 910 000 000"     :error="errors.phone" required type="tel" />
      <BaseInput v-model="form.email"    label="Email"          placeholder="email@exemplo.pt"     :error="errors.email" required type="email" />
      <BaseInput v-model="form.locality" label="Localidade"     placeholder="Ex: Ponte de Lima"    :error="errors.locality" />
    </div>

    <!-- Tipo de projeto -->
    <div>
      <label class="form-label">Tipo de Projeto <span class="text-brand-orange">*</span></label>
      <div class="flex flex-wrap gap-2 mt-2">
        <button
          v-for="type in projectTypes"
          :key="type"
          type="button"
          @click="form.projectType = type; delete errors.projectType"
          class="px-4 py-2 font-sans text-xs font-medium transition-all duration-200"
          :style="form.projectType === type
            ? 'background:#2D2D2D;color:white'
            : 'background:#EAE6DF;color:rgba(45,45,45,0.6)'"
        >
          {{ type }}
        </button>
      </div>
      <p v-if="errors.projectType" class="mt-2 text-xs text-red-500 font-sans">{{ errors.projectType }}</p>
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
      <label class="flex gap-3 cursor-pointer">
        <div class="flex-shrink-0 mt-0.5 w-5 h-5 border-2 transition-colors duration-200 flex items-center justify-center"
          :style="form.rgpd ? 'background:#2D2D2D;border-color:#2D2D2D' : 'background:transparent;border-color:rgba(45,45,45,0.3)'"
          @click="form.rgpd = !form.rgpd; delete errors.rgpd"
        >
          <svg v-if="form.rgpd" width="12" height="12" fill="none" stroke="white" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
          </svg>
        </div>
        <input v-model="form.rgpd" type="checkbox" class="sr-only" />
        <span class="font-sans text-sm text-brand-charcoal/60 leading-relaxed">
          Concordo com o tratamento dos meus dados pessoais para resposta a este pedido de orçamento, de acordo com a política de privacidade da Carpintaria Marinheiro.
        </span>
      </label>
      <p v-if="errors.rgpd" class="mt-2 text-xs text-red-500 font-sans">{{ errors.rgpd }}</p>
    </div>

    <!-- Erro de envio -->
    <div v-if="submitError" class="font-sans text-sm text-red-600 bg-red-50 border border-red-200 p-4">
      {{ submitError }}
      <div class="mt-3 flex flex-wrap gap-3">
        <a :href="`tel:${company.contact.phone}`" class="btn-primary py-2 px-4 text-xs">Ligar agora</a>
        <a :href="`https://wa.me/${company.contact.whatsapp}`" target="_blank" class="btn-outline py-2 px-4 text-xs">WhatsApp</a>
      </div>
    </div>

    <button type="submit" class="btn-primary w-full md:w-auto" :disabled="submitting" :style="submitting ? 'opacity:0.6;cursor:not-allowed' : ''">
      <span v-if="submitting" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
      {{ submitting ? 'A enviar…' : 'Enviar Pedido de Orçamento' }}
    </button>
  </form>
</template>
