import useSwr from 'swr'
import fetcher from '@/libs/fetcher'

export default function useBillboard() {
  const { data, error, isLoading } = useSwr('/api/random', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return {
    data,
    error,
    isLoading
  }
}
