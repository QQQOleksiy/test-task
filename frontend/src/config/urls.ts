const baseURL = import.meta.env.VITE_API_BASE_URL

const urls = {
    getAll : '/recipes',
    getById: (id: string): string => `/recipes/${id}`,
    getFiltered: (filterType: string, value: string): string => `/recipes?${filterType}=${value}`
}

export {
    baseURL,
    urls
}