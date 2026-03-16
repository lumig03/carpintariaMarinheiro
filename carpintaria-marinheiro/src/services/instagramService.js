import axios from 'axios'
import { portfolioFallback } from '@/data/portfolioFallback'

const API_BASE = '/api/instagram'

/**
 * Fetches the Instagram feed from the internal API proxy.
 * The backend (Node/Express or serverless function) is responsible for
 * calling the Meta Graph API with the long-lived token securely stored
 * server-side. The token is NEVER exposed in this frontend service.
 *
 * Expected backend endpoint:  GET /api/instagram/feed
 * Optional query params:
 *   ?limit=12   — number of posts to return (default 12)
 *   ?after=XXX  — pagination cursor
 */
export async function fetchInstagramFeed(limit = 12) {
  try {
    const response = await axios.get(`${API_BASE}/feed`, {
      params: { limit },
      timeout: 8000,
    })
    return {
      data: response.data,
      source: 'api',
      error: null,
    }
  } catch (err) {
    console.warn('[instagramService] API unavailable, using fallback data.', err?.message)
    return {
      data: portfolioFallback.slice(0, limit),
      source: 'fallback',
      error: err?.message || 'API indisponível',
    }
  }
}

/**
 * Filters portfolio items by category.
 * Works with both API data and fallback data.
 */
export function filterByCategory(items, category) {
  if (!category || category === 'Todos') return items
  return items.filter(item => item.category === category)
}

/**
 * Formats a raw caption text by stripping hashtags and trimming.
 */
export function formatCaption(caption = '') {
  return caption
    .split('\n')[0]           // first line only
    .replace(/#\w+/g, '')     // remove hashtags
    .trim()
}

export default { fetchInstagramFeed, filterByCategory, formatCaption }
