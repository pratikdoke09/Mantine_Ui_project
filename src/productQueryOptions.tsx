import { queryOptions } from '@tanstack/react-query'
import { fetchProduct } from './product'

export const productQueryOptions = (productId: string) =>
  queryOptions({
    queryKey: ['product', { productId }],
    queryFn: () => fetchProduct(productId),
  })
