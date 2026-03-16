import { ref, computed } from 'vue'
import { loadProjects, saveProjects, generateId, defaultProjects } from '@/data/projectsData'

// Shared reactive state — singleton across all components
const projects = ref(loadProjects())

export function useProjects() {

  function reload() {
    projects.value = loadProjects()
  }

  const allProjects = computed(() =>
    [...projects.value].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  )

  const featuredProjects = computed(() =>
    projects.value
      .filter(p => p.featured)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6)
  )

  function byCategory(category) {
    return computed(() => {
      const sorted = [...projects.value].sort((a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
      )
      if (!category.value || category.value === 'Todos') return sorted
      return sorted.filter(p => p.category === category.value)
    })
  }

  function add(project) {
    const newProject = {
      ...project,
      id: generateId(),
      createdAt: new Date().toISOString().split('T')[0],
    }
    projects.value = [newProject, ...projects.value]
    saveProjects(projects.value)
    return newProject
  }

  function update(id, changes) {
    const idx = projects.value.findIndex(p => p.id === id)
    if (idx === -1) return false
    projects.value = projects.value.map(p => p.id === id ? { ...p, ...changes } : p)
    saveProjects(projects.value)
    return true
  }

  function remove(id) {
    projects.value = projects.value.filter(p => p.id !== id)
    saveProjects(projects.value)
  }

  function toggleFeatured(id) {
    projects.value = projects.value.map(p =>
      p.id === id ? { ...p, featured: !p.featured } : p
    )
    saveProjects(projects.value)
  }

  function resetToDefaults() {
    projects.value = [...defaultProjects]
    saveProjects(projects.value)
  }

  return {
    projects,
    allProjects,
    featuredProjects,
    byCategory,
    reload,
    add,
    update,
    remove,
    toggleFeatured,
    resetToDefaults,
  }
}
