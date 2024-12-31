import { queryOptions } from '@tanstack/react-query'
import { fetchProducts } from './product'

export const productsQueryOptions = queryOptions({
  queryKey: ['products'],
  queryFn: () => fetchProducts(),
})
