import axios from 'axios'

export type ProductType = {
  id: string
  title: string
  price: string
  description: string
  category: string
  image: string
}

export class ProductNotFoundError extends Error {}

export const fetchProduct = async (productId: string) => {
  console.info(`Fetching Product with id ${productId}...`)
  await new Promise((r) => setTimeout(r, 500))
  const product = await axios
    .get<ProductType>(`https://fakestoreapi.com/products/${productId}`)
    .then((r) => r.data)
    .catch((err) => {
      if (err.status === 404) {
        throw new ProductNotFoundError(`product with id "${productId}" not found!`)
      }
      throw err
    })

  return product
}

export const fetchProducts = async () => {
  console.info('Fetching product...')
  await new Promise((r) => setTimeout(r, 500))
  return axios
    .get<Array<ProductType>>('https://fakestoreapi.com/products')
    .then((r) => r.data.slice(0, 10))
}
