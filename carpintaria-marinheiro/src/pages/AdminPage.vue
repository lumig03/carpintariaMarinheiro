<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProjects } from '@/composables/useProjects'
import { categories, defaultProjects, saveProjects } from '@/data/projectsData'
import LogoSaw from '@/components/ui/LogoSaw.vue'

// ─── Auth ─────────────────────────────────────────────────
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'marinheiro2024'
const authenticated  = ref(false)
const passwordInput  = ref('')
const authError      = ref('')

function login() {
  if (passwordInput.value === ADMIN_PASSWORD) {
    authenticated.value = true
    authError.value = ''
    sessionStorage.setItem('cm_admin', '1')
  } else {
    authError.value = 'Password incorrecta. Tente novamente.'
    passwordInput.value = ''
  }
}
function logout() {
  authenticated.value = false
  sessionStorage.removeItem('cm_admin')
}
onMounted(() => {
  if (sessionStorage.getItem('cm_admin') === '1') authenticated.value = true
})

// ─── Projects ─────────────────────────────────────────────
const { projects, allProjects, add, update, remove, toggleFeatured, resetToDefaults } = useProjects()

const activeTab    = ref('list')  // 'list' | 'add' | 'edit'
const editingId    = ref(null)
const deleteConfirm = ref(null)
const saved        = ref(false)

const blankForm = () => ({
  title: '', category: 'Cozinhas', description: '', image: '', featured: false,
})
const form       = ref(blankForm())
const formErrors = ref({})
const imageMode  = ref('url') // 'url' | 'upload'
const uploading  = ref(false)

function validateForm() {
  const e = {}
  if (!form.value.title.trim())       e.title       = 'Título obrigatório.'
  if (!form.value.description.trim()) e.description = 'Descrição obrigatória.'
  if (!form.value.image.trim())       e.image       = 'Imagem obrigatória.'
  formErrors.value = e
  return Object.keys(e).length === 0
}

function startAdd() {
  form.value  = blankForm()
  editingId.value = null
  formErrors.value = {}
  activeTab.value = 'add'
}

function startEdit(project) {
  form.value  = { ...project }
  editingId.value = project.id
  formErrors.value = {}
  activeTab.value = 'edit'
}

function saveForm() {
  if (!validateForm()) return
  if (editingId.value) {
    update(editingId.value, { ...form.value })
  } else {
    add({ ...form.value })
  }
  saved.value = true
  setTimeout(() => { saved.value = false; activeTab.value = 'list' }, 1200)
}

function cancelForm() {
  activeTab.value = 'list'
  formErrors.value = {}
}

function confirmDelete(id) { deleteConfirm.value = id }
function cancelDelete()    { deleteConfirm.value = null }
function doDelete(id) {
  remove(id)
  deleteConfirm.value = null
}

// Image upload → convert to base64 data URL (stored in localStorage)
function handleFileUpload(e) {
  const file = e.target.files[0]
  if (!file) return
  if (file.size > 2 * 1024 * 1024) {
    formErrors.value.image = 'Ficheiro demasiado grande. Máximo 2MB. Use um URL em alternativa.'
    return
  }
  uploading.value = true
  const reader = new FileReader()
  reader.onload = evt => {
    form.value.image = evt.target.result
    uploading.value  = false
    delete formErrors.value.image
  }
  reader.readAsDataURL(file)
}

function doResetDefaults() {
  if (confirm('Repor projetos de demonstração? Os projetos actuais serão substituídos.')) {
    resetToDefaults()
  }
}

// Stats
const total     = computed(() => projects.value.length)
const featured  = computed(() => projects.value.filter(p => p.featured).length)
const byCat     = computed(() => {
  const m = {}
  projects.value.forEach(p => { m[p.category] = (m[p.category] || 0) + 1 })
  return m
})
</script>

<template>
  <!-- ─── LOGIN ─── -->
  <div v-if="!authenticated" class="min-h-screen flex items-center justify-center bg-brand-beige/30 pt-16">
    <div class="bg-white p-10 w-full max-w-sm shadow-lg">
      <div class="flex items-center justify-center gap-3 mb-8">
        <LogoSaw :light="false" :size="40" />
        <div class="flex flex-col leading-tight">
          <span class="font-sans font-semibold text-xs" style="letter-spacing:0.2em;color:#2D2D2D">CARPINTARIA</span>
          <span class="font-heading font-bold text-lg" style="color:#8C5331">MARINHEIRO</span>
        </div>
      </div>
      <p class="font-sans text-xs uppercase text-brand-gray text-center mb-6" style="letter-spacing:0.15em">
        Área de Administração
      </p>
      <form @submit.prevent="login" class="space-y-5">
        <div>
          <label class="form-label">Password</label>
          <input
            v-model="passwordInput"
            type="password"
            placeholder="••••••••••"
            class="input-field"
            autofocus
          />
          <p v-if="authError" class="mt-2 text-xs text-red-500 font-sans">{{ authError }}</p>
        </div>
        <button type="submit" class="btn-primary w-full">Entrar</button>
      </form>
      <p class="font-sans text-xs text-brand-gray/50 text-center mt-6">
        Password padrão: <code class="bg-brand-beige px-1">marinheiro2024</code><br>
        Alterar em <code class="bg-brand-beige px-1">.env → VITE_ADMIN_PASSWORD</code>
      </p>
    </div>
  </div>

  <!-- ─── ADMIN DASHBOARD ─── -->
  <div v-else class="min-h-screen bg-brand-beige/20 pt-16">

    <!-- Top bar -->
    <div class="bg-brand-dark text-white">
      <div class="container-site py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <LogoSaw :light="true" :size="32" />
          <div>
            <p class="font-sans text-xs uppercase text-white/50" style="letter-spacing:0.15em">Administração</p>
            <p class="font-heading text-lg text-white leading-none">Gestão de Projetos</p>
          </div>
        </div>
        <button @click="logout" class="font-sans text-xs text-white/40 hover:text-white transition-colors flex items-center gap-2" style="background:none;border:none;cursor:pointer">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"/>
          </svg>
          Sair
        </button>
      </div>
    </div>

    <div class="container-site py-8">

      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white p-5 border-t-2 border-brand-orange">
          <p class="font-heading text-3xl text-brand-charcoal">{{ total }}</p>
          <p class="font-sans text-xs text-brand-gray mt-1">Total de projetos</p>
        </div>
        <div class="bg-white p-5 border-t-2 border-brand-orange/40">
          <p class="font-heading text-3xl text-brand-charcoal">{{ featured }}</p>
          <p class="font-sans text-xs text-brand-gray mt-1">Em destaque</p>
        </div>
        <div class="bg-white p-5 border-t-2 border-brand-sand col-span-2 md:col-span-2">
          <p class="font-sans text-xs text-brand-gray mb-2">Por categoria</p>
          <div class="flex flex-wrap gap-2">
            <span v-for="(count, cat) in byCat" :key="cat"
              class="font-sans text-xs bg-brand-beige px-2 py-0.5 text-brand-charcoal">
              {{ cat }}: {{ count }}
            </span>
          </div>
        </div>
      </div>

      <!-- Action bar -->
      <div class="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div class="flex gap-3">
          <button @click="activeTab = 'list'" class="font-sans text-xs uppercase transition-colors px-4 py-2" style="background:none;border:none;cursor:pointer;letter-spacing:0.12em"
            :style="activeTab === 'list' ? 'background:#2D2D2D;color:white' : 'background:#EAE6DF;color:rgba(45,45,45,0.7)'">
            Lista
          </button>
          <button @click="startAdd" class="btn-primary py-2 px-5 text-xs">
            + Novo Projeto
          </button>
        </div>
        <button @click="doResetDefaults" class="font-sans text-xs text-brand-gray/50 hover:text-brand-gray transition-colors" style="background:none;border:none;cursor:pointer">
          Repor demonstração
        </button>
      </div>

      <!-- ─── LISTA DE PROJETOS ─── -->
      <div v-if="activeTab === 'list'" class="space-y-3">
        <div
          v-for="project in allProjects"
          :key="project.id"
          class="bg-white flex items-center gap-4 p-4 hover:shadow-md transition-shadow"
        >
          <!-- Thumbnail -->
          <div class="w-16 h-16 flex-shrink-0 overflow-hidden bg-brand-beige">
            <img :src="project.image" :alt="project.title" class="w-full h-full object-cover" loading="lazy" />
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap mb-1">
              <p class="font-heading text-brand-charcoal text-base leading-tight">{{ project.title }}</p>
              <span class="font-sans text-xs bg-brand-beige px-2 py-0.5 text-brand-charcoal/60">{{ project.category }}</span>
              <span v-if="project.featured" class="font-sans text-xs bg-brand-orange/15 text-brand-orange px-2 py-0.5">Destaque</span>
            </div>
            <p class="font-sans text-xs text-brand-gray truncate">{{ project.description }}</p>
            <p class="font-sans text-xs text-brand-gray/40 mt-1">{{ project.createdAt }}</p>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2 flex-shrink-0">
            <!-- Toggle featured -->
            <button
              @click="toggleFeatured(project.id)"
              :title="project.featured ? 'Remover do destaque' : 'Colocar em destaque'"
              class="w-8 h-8 flex items-center justify-center transition-colors"
              style="background:none;border:none;cursor:pointer"
              :style="project.featured ? 'color:#8C5331' : 'color:rgba(45,45,45,0.3)'"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
              </svg>
            </button>
            <!-- Edit -->
            <button @click="startEdit(project)" class="w-8 h-8 flex items-center justify-center text-brand-charcoal/40 hover:text-brand-charcoal transition-colors" style="background:none;border:none;cursor:pointer">
              <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
              </svg>
            </button>
            <!-- Delete -->
            <button @click="confirmDelete(project.id)" class="w-8 h-8 flex items-center justify-center text-brand-charcoal/30 hover:text-red-500 transition-colors" style="background:none;border:none;cursor:pointer">
              <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
              </svg>
            </button>
          </div>
        </div>

        <div v-if="allProjects.length === 0" class="py-20 text-center bg-white">
          <p class="font-sans text-brand-gray mb-4">Nenhum projeto. Adicione o primeiro!</p>
          <button @click="startAdd" class="btn-primary text-xs">+ Novo Projeto</button>
        </div>
      </div>

      <!-- ─── FORMULÁRIO ADD/EDIT ─── -->
      <div v-if="activeTab === 'add' || activeTab === 'edit'" class="bg-white p-8 max-w-2xl">
        <h2 class="font-heading text-2xl text-brand-charcoal mb-8">
          {{ activeTab === 'edit' ? 'Editar Projeto' : 'Novo Projeto' }}
        </h2>

        <form @submit.prevent="saveForm" class="space-y-7">

          <!-- Título -->
          <div>
            <label class="form-label">Título <span class="text-brand-orange">*</span></label>
            <input v-model="form.title" type="text" placeholder="Ex: Cozinha Moderna Branca" class="input-field"
              :class="formErrors.title ? 'error' : ''" />
            <p v-if="formErrors.title" class="mt-1 text-xs text-red-500">{{ formErrors.title }}</p>
          </div>

          <!-- Categoria -->
          <div>
            <label class="form-label">Categoria <span class="text-brand-orange">*</span></label>
            <div class="flex flex-wrap gap-2 mt-2">
              <button
                v-for="cat in categories.filter(c => c !== 'Todos')"
                :key="cat"
                type="button"
                @click="form.category = cat"
                class="px-4 py-2 font-sans text-xs transition-all duration-200"
                style="border:none;cursor:pointer"
                :style="form.category === cat
                  ? 'background:#2D2D2D;color:white'
                  : 'background:#EAE6DF;color:rgba(45,45,45,0.6)'"
              >{{ cat }}</button>
            </div>
          </div>

          <!-- Descrição -->
          <div>
            <label class="form-label">Descrição <span class="text-brand-orange">*</span></label>
            <textarea v-model="form.description" rows="3" placeholder="Descrição breve do projeto…"
              class="input-field resize-none"
              :class="formErrors.description ? 'error' : ''" />
            <p v-if="formErrors.description" class="mt-1 text-xs text-red-500">{{ formErrors.description }}</p>
          </div>

          <!-- Imagem -->
          <div>
            <label class="form-label">Imagem <span class="text-brand-orange">*</span></label>
            <!-- Mode toggle -->
            <div class="flex gap-2 mb-3">
              <button type="button" @click="imageMode = 'url'"
                class="px-3 py-1.5 font-sans text-xs transition-all" style="border:none;cursor:pointer"
                :style="imageMode === 'url' ? 'background:#2D2D2D;color:white' : 'background:#EAE6DF;color:rgba(45,45,45,0.6)'">
                URL da imagem
              </button>
              <button type="button" @click="imageMode = 'upload'"
                class="px-3 py-1.5 font-sans text-xs transition-all" style="border:none;cursor:pointer"
                :style="imageMode === 'upload' ? 'background:#2D2D2D;color:white' : 'background:#EAE6DF;color:rgba(45,45,45,0.6)'">
                Upload (max 2MB)
              </button>
            </div>

            <!-- URL input -->
            <input
              v-if="imageMode === 'url'"
              v-model="form.image"
              type="url"
              placeholder="https://exemplo.com/imagem.jpg"
              class="input-field"
              :class="formErrors.image ? 'error' : ''"
            />

            <!-- File upload -->
            <div v-else>
              <label class="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-brand-sand hover:border-brand-orange transition-colors cursor-pointer">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" class="text-brand-gray">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
                </svg>
                <span class="font-sans text-sm text-brand-gray">
                  {{ uploading ? 'A carregar…' : 'Clique para seleccionar imagem' }}
                </span>
                <input type="file" accept="image/*" class="sr-only" @change="handleFileUpload" :disabled="uploading" />
              </label>
            </div>

            <!-- Preview -->
            <div v-if="form.image && !uploading" class="mt-3">
              <img :src="form.image" alt="Preview" class="h-40 w-full object-cover" />
            </div>
            <p v-if="formErrors.image" class="mt-1 text-xs text-red-500">{{ formErrors.image }}</p>
          </div>

          <!-- Destaque -->
          <div>
            <label class="flex items-center gap-3 cursor-pointer">
              <div
                class="w-5 h-5 border-2 transition-colors flex items-center justify-center flex-shrink-0"
                style="cursor:pointer"
                :style="form.featured ? 'background:#2D2D2D;border-color:#2D2D2D' : 'border-color:rgba(45,45,45,0.25)'"
                @click="form.featured = !form.featured"
              >
                <svg v-if="form.featured" width="12" height="12" fill="none" stroke="white" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                </svg>
              </div>
              <input v-model="form.featured" type="checkbox" class="sr-only" />
              <span class="font-sans text-sm text-brand-charcoal/70">
                Mostrar em destaque na homepage
              </span>
            </label>
          </div>

          <!-- Saved feedback -->
          <div v-if="saved" class="flex items-center gap-2 text-green-600 font-sans text-sm">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Guardado com sucesso!
          </div>

          <!-- Buttons -->
          <div class="flex gap-4">
            <button type="submit" class="btn-primary">
              {{ activeTab === 'edit' ? 'Guardar Alterações' : 'Adicionar Projeto' }}
            </button>
            <button type="button" @click="cancelForm" class="btn-outline">Cancelar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete confirm modal -->
    <Teleport to="body">
      <Transition enter-active-class="transition-all duration-200" enter-from-class="opacity-0" enter-to-class="opacity-100"
        leave-active-class="transition-all duration-150" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="deleteConfirm" class="fixed inset-0 z-[100] flex items-center justify-center p-4" style="background:rgba(0,0,0,0.5)" @click.self="cancelDelete">
          <div class="bg-white p-8 max-w-sm w-full" @click.stop>
            <h3 class="font-heading text-xl text-brand-charcoal mb-3">Eliminar projeto?</h3>
            <p class="font-sans text-sm text-brand-gray mb-6">Esta acção não pode ser desfeita.</p>
            <div class="flex gap-3">
              <button @click="doDelete(deleteConfirm)" class="btn-primary text-xs py-3" style="background:#dc2626">Eliminar</button>
              <button @click="cancelDelete" class="btn-outline text-xs py-3">Cancelar</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
