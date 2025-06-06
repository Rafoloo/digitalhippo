import { render, screen, waitFor } from '@testing-library/react'
import ProductListing from '@/components/ProductListing'
import { Product } from '@/payload-types'
import { PRODUCT_CATEGORIES } from '@/config'

// Mock ImageSlider component
jest.mock('@/components/ImageSlider', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>ImageSlider Mock</div>
    },
  }
})

// Mocking utils and config
jest.mock('@/lib/utils', () => ({
  ...jest.requireActual('@/lib/utils'),
  formatPrice: (price: number) => `$${price.toFixed(2)}`,
}))

jest.mock('@/config', () => ({
  PRODUCT_CATEGORIES: [
    {
      label: 'UI Kits',
      value: 'ui_kits',
      featured: [],
    },
    {
      label: 'Icons',
      value: 'icons',
      featured: [],
    },
  ],
}))

describe('ProductListing', () => {
  it('renders a placeholder when product is null', () => {
    render(<ProductListing product={null} index={0} />)
    expect(screen.getByTestId('product-placeholder')).toBeInTheDocument()
  })

  it('renders a placeholder initially', () => {
    const product: Product = {
      id: '1',
      name: 'Test Product',
      price: 100,
      category: 'icons',
      images: [{ image: 'url' }],
      createdAt: '',
      description: '',
      updatedAt: '',
      user: '',
    }
    render(<ProductListing product={product} index={0} />)
    expect(screen.getByTestId('product-placeholder')).toBeInTheDocument()
  })

  it('renders the product details after a delay', async () => {
    const product: Product = {
      id: '1',
      name: 'Test Product',
      price: 100,
      category: 'icons',
      images: [{ image: 'url' }],
      createdAt: '',
      description: '',
      updatedAt: '',
      user: '',
    }
    render(<ProductListing product={product} index={0} />)

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument()
      expect(screen.getByText('Icons')).toBeInTheDocument()
      expect(screen.getByText('$100.00')).toBeInTheDocument()
    })
  })
})
