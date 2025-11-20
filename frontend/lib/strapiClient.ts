// Strapi API Client
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'

export interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiItem<T> {
  id: number
  attributes: T
}

// Simple cache for API calls
const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Generic API call function with caching
async function fetchAPI<T>(endpoint: string): Promise<StrapiResponse<T>> {
  const url = `${STRAPI_URL}/api${endpoint}`
  
  // Check cache first
  const cached = cache.get(url)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 } // 5 minutes revalidation
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    // Cache the result
    cache.set(url, { data, timestamp: Date.now() })
    
    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// Gift interfaces
export interface Gift {
  id: number
  title: string
  description: string
  price: number
  image: {
    data: {
      attributes: {
        url: string
        alternativeText: string
      }
    }
  }
  category: {
    data: {
      attributes: {
        name: string
        slug: string
      }
    }
  }
  slug: string
  featured: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Category {
  name: string
  slug: string
  description: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

// Blog interfaces
export interface BlogPost {
  id: number
  title: string
  content: string
  excerpt: string
  slug: string
  featuredImage: {
    data: {
      attributes: {
        url: string
        alternativeText: string
      }
    }
  }
  author: {
    data: {
      attributes: {
        name: string
        bio: string
        avatar: {
          data: {
            attributes: {
              url: string
            }
          }
        }
      }
    }
  }
  createdAt: string
  updatedAt: string
  publishedAt: string
}

// API functions
export const strapiClient = {
  // Gifts
  async getGifts(params?: { 
    populate?: string
    filters?: Record<string, any>
    sort?: string
    pagination?: { page: number; pageSize: number }
  }) {
    const queryParams = new URLSearchParams()
    
    if (params?.populate) queryParams.append('populate', params.populate)
    if (params?.sort) queryParams.append('sort', params.sort)
    if (params?.pagination) {
      queryParams.append('pagination[page]', params.pagination.page.toString())
      queryParams.append('pagination[pageSize]', params.pagination.pageSize.toString())
    }
    
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        queryParams.append(`filters[${key}]`, value)
      })
    }

    const endpoint = `/gifts?${queryParams.toString()}`
    return fetchAPI<StrapiItem<Gift>[]>(endpoint)
  },

  async getGift(slug: string) {
    return fetchAPI<StrapiItem<Gift>[]>(`/gifts?filters[slug][$eq]=${slug}&populate=*`)
  },

  async getFeaturedGifts() {
    return fetchAPI<StrapiItem<Gift>[]>(`/gifts?filters[featured][$eq]=true&populate=*&pagination[pageSize]=6`)
  },

  // Categories
  async getCategories() {
    return fetchAPI<StrapiItem<Category>[]>(`/categories?populate=*`)
  },

  async getCategory(slug: string) {
    return fetchAPI<StrapiItem<Category>[]>(`/categories?filters[slug][$eq]=${slug}&populate=*`)
  },

  // Blog
  async getBlogPosts(params?: {
    populate?: string
    sort?: string
    pagination?: { page: number; pageSize: number }
  }) {
    const queryParams = new URLSearchParams()
    
    if (params?.populate) queryParams.append('populate', params.populate)
    if (params?.sort) queryParams.append('sort', params.sort)
    if (params?.pagination) {
      queryParams.append('pagination[page]', params.pagination.page.toString())
      queryParams.append('pagination[pageSize]', params.pagination.pageSize.toString())
    }

    const endpoint = `/blog-posts?${queryParams.toString()}`
    return fetchAPI<StrapiItem<BlogPost>[]>(endpoint)
  },

  async getBlogPost(slug: string) {
    return fetchAPI<StrapiItem<BlogPost>[]>(`/blog-posts?filters[slug][$eq]=${slug}&populate=*`)
  },

  async getFeaturedBlogPosts() {
    return fetchAPI<StrapiItem<BlogPost>[]>(`/blog-posts?populate=*&pagination[pageSize]=3&sort=publishedAt:desc`)
  }
}
