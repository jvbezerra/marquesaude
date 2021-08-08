import useSWR from 'swr'
import api from '../services/api'

export function useFetch<Data>(url: string | null) {
  const { data, error } = useSWR<Data>(url, async url => {
    const response = await api.get(url)
    return response.data
  })

  return { data, error }
}