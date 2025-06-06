import { render, screen } from '@testing-library/react'
import Navbar from '@/components/Navbar'
import { getServerSideUser } from '@/lib/payload-utils'

// Mocks
jest.mock('@/lib/payload-utils', () => ({
  getServerSideUser: jest.fn(),
}))
jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(),
  })),
}))
jest.mock('@/components/NavItems', () => () => <div>NavItems</div>)
jest.mock('@/components/Cart', () => () => <div>Cart</div>)
jest.mock('@/components/UserAccountNav', () => () => <div>UserAccountNav</div>)
jest.mock('@/components/MobileNav', () => () => <div>MobileNav</div>)

describe('Navbar', () => {
  it('renders sign-in and sign-up links when no user is logged in', async () => {
    (getServerSideUser as jest.Mock).mockResolvedValue({ user: null })
    
    const { container } = render(<div>{await Navbar()}</div>)

    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.getByText('Crie sua conta')).toBeInTheDocument()
    expect(screen.queryByText('UserAccountNav')).not.toBeInTheDocument()
  })

  it('renders UserAccountNav when a user is logged in', async () => {
    const user = { id: '1', email: 'test@example.com' };
    (getServerSideUser as jest.Mock).mockResolvedValue({ user })

    const { container } = render(<div>{await Navbar()}</div>)

    expect(screen.queryByText('Login')).not.toBeInTheDocument()
    expect(screen.queryByText('Crie sua conta')).not.toBeInTheDocument()
    expect(screen.getByText('UserAccountNav')).toBeInTheDocument()
  })

  it('renders common elements like logo, NavItems, and Cart', async () => {
    (getServerSideUser as jest.Mock).mockResolvedValue({ user: null })

    const { container } = render(<div>{await Navbar()}</div>)

    expect(screen.getByTestId('logo-link')).toBeInTheDocument()
    expect(screen.getByText('NavItems')).toBeInTheDocument()
    expect(screen.getByText('Cart')).toBeInTheDocument()
    expect(screen.getByText('MobileNav')).toBeInTheDocument()
  })
}) 