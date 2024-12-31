import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { productsQueryOptions } from '../productsQueryOptions'

export const Route = createFileRoute('/product')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(productsQueryOptions),
  component: PostsComponent,
})

function PostsComponent() {
  const productsQuery = useSuspenseQuery(productsQueryOptions)
  const products = productsQuery.data

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[
        ...products,
        {
          id: 'i-do-not-exist',
          title: 'Non-existent Post',
          price: 0,
          description: 'No description available.',
          category: 'No category',
          image: 'https://via.placeholder.com/150',
        },
      ].map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-md rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
        >
          <Link
            to="/product/$productId"
            params={{ productId: product.id }}
            className="block"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {product.title}
              </h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-gray-600 text-base mt-2 line-clamp-3">
                {product.description}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 focus:outline-none">
                  Add to Cart
                </button>
              </div>
            </div>
          </Link>
        </div>
      ))}
      <hr />
      <Outlet />
    </div>
  )
}
