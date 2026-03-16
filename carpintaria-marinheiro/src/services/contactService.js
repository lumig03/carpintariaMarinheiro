import axios from 'axios'

/**
 * Submits the contact / quote form.
 *
 * The implementation is prepared for multiple submission strategies.
 * Set the VITE_FORM_PROVIDER env variable to:
 *   'api'        → internal backend endpoint  /api/contact
 *   'formspree'  → Formspree (set VITE_FORMSPREE_ID)
 *   'emailjs'    → EmailJS  (set VITE_EMAILJS_* vars)
 *   'netlify'    → Netlify Forms (uses native fetch with FormData)
 *
 * Default: 'api'
 */

const PROVIDER = import.meta.env.VITE_FORM_PROVIDER || 'api'

export async function submitContactForm(formData) {
  switch (PROVIDER) {
    case 'formspree':
      return submitFormspree(formData)
    case 'netlify':
      return submitNetlify(formData)
    case 'emailjs':
      return submitEmailJS(formData)
    default:
      return submitInternalAPI(formData)
  }
}

async function submitInternalAPI(formData) {
  const response = await axios.post('/api/contact', formData)
  return response.data
}

async function submitFormspree(formData) {
  const id = import.meta.env.VITE_FORMSPREE_ID
  if (!id) throw new Error('VITE_FORMSPREE_ID não configurado')
  const response = await fetch(`https://formspree.io/f/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(formData),
  })
  if (!response.ok) throw new Error('Erro ao enviar formulário via Formspree')
  return response.json()
}

async function submitNetlify(formData) {
  const body = new URLSearchParams({ 'form-name': 'orcamento', ...formData })
  const response = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
  if (!response.ok) throw new Error('Erro ao enviar formulário via Netlify')
  return { success: true }
}

async function submitEmailJS(formData) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  if (!serviceId || !templateId || !publicKey) {
    throw new Error('Variáveis EmailJS não configuradas')
  }
  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: formData,
    }),
  })
  if (!response.ok) throw new Error('Erro ao enviar via EmailJS')
  return { success: true }
}

export default { submitContactForm }
