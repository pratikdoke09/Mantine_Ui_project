import * as React from 'react'
import {
  ErrorComponent,
  createFileRoute,
  useRouter,
} from '@tanstack/react-router'
import {
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { ProductNotFoundError } from '../../product'
import { productQueryOptions } from '../../productQueryOptions'
import type { ErrorComponentProps } from '@tanstack/react-router'

export const Route = createFileRoute('/product/$productId')({
  loader: ({ context: { queryClient }, params: { productId } }) => {
    return queryClient.ensureQueryData(productQueryOptions(productId))
  },
  errorComponent: ProductErrorComponent,
  component: ProductComponent,
})

export function ProductErrorComponent({ error }: ErrorComponentProps) {
  const router = useRouter()
  if (error instanceof ProductNotFoundError) {
    return <div>{error.message}</div> // Custom error message for product not found
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const queryErrorResetBoundary = useQueryErrorResetBoundary()

  React.useEffect(() => {
    queryErrorResetBoundary.reset()
  }, [queryErrorResetBoundary])

  return (
    <div>
      <button
        onClick={() => {
          router.invalidate() // Invalidate to retry fetching the data
        }}
      >
        Retry
      </button>
      <ErrorComponent error={error} />
    </div>
  )
}

function ProductComponent() {
  const productId = Route.useParams().productId // Use useRouter() to get productId
  const { data: product, error } = useSuspenseQuery(
    productQueryOptions(productId),
  )

  if (error) {
    console.log(error)
    // Handle case where product is not found
    return <div className="text-center text-red-500 font-semibold">Product not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <div className="flex-shrink-0 w-full md:w-1/3">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        </div>
        
        {/* Product Details */}
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">{product.title}</h2>
          <div className="text-xl font-bold text-blue-600">${product.price}</div>
          <div className="text-gray-600">{product.description}</div>
          <div className="text-sm text-gray-500">{product.category}</div>
          
          {/* Add to Cart Button */}
          <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200 focus:outline-none">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
