import useSWR from 'swr'
import api from '../services/api'

export function useFetch<Data>(url: any | null) {
  const { data, error } = useSWR<Data>(url, async url => {
    const response = await api.get(url)
    return response.data
  })

  return { data, error }
}