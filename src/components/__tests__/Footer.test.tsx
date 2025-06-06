import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

describe('Footer', () => {
  it('renders the full footer on a normal path', () => {
    const { usePathname } = require('next/navigation')
    usePathname.mockReturnValue('/')

    render(<Footer />)
    expect(screen.getByText(/Torne-se um vendedor/i)).toBeInTheDocument()
    expect(screen.getByText(/Comece agora/i)).toBeInTheDocument()
    expect(screen.getByText(/Todos os direitos reservados/i)).toBeInTheDocument()
  })

  it('renders a minimized footer on specific paths', () => {
    const { usePathname } = require('next/navigation')
    usePathname.mockReturnValue('/sign-in')

    render(<Footer />)
    expect(screen.queryByText(/Torne-se um vendedor/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Comece agora/i)).not.toBeInTheDocument()
    expect(screen.getByText(/Todos os direitos reservados/i)).toBeInTheDocument()
  })

  it('displays the current year', () => {
    const { usePathname } = require('next/navigation')
    usePathname.mockReturnValue('/')

    render(<Footer />)
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(`© ${year} Todos os direitos reservados`)).toBeInTheDocument()
  })
}) 