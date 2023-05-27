import useSwr from 'swr'
import fetcher from '@/libs/fetcher'

export default function useMovie(id) {
  const { data, error, isLoading } = useSwr(id ? `/api/movies/${id}` : null, fetcher, {
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
