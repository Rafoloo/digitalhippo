import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UserAccountNav from '@/components/UserAccountNav'
import { useAuth } from '@/hooks/use-auth'
import { User } from '@/payload-types'

// Mock useAuth hook
const mockedSignOut = jest.fn()
jest.mock('@/hooks/use-auth', () => ({
  useAuth: () => ({
    signOut: mockedSignOut,
  }),
}))

describe('UserAccountNav', () => {
  const user: User = {
    id: '1',
    email: 'test@example.com',
    createdAt: '',
    updatedAt: '',
    user: '',
  }

  beforeEach(() => {
    // Clear mock calls before each test
    mockedSignOut.mockClear()
  })

  it('renders user email and menu items', () => {
    render(<UserAccountNav user={user} />)
    expect(screen.getByText('Minha Conta')).toBeInTheDocument()
  })

  it('calls signOut when logout is clicked', async () => {
    render(<UserAccountNav user={user} />)

    await userEvent.click(screen.getByText('Minha Conta'))
    
    const logoutButton = await screen.findByRole('menuitem', { name: 'Log out' })
    await userEvent.click(logoutButton)

    expect(mockedSignOut).toHaveBeenCalled()
  })

  it('renders the dashboard link', async () => {
    render(<UserAccountNav user={user} />)

    await userEvent.click(screen.getByText('Minha Conta'))

    const dashboardLink = await screen.findByRole('menuitem', { name: 'Dashboard de Vendas' })
    expect(dashboardLink.closest('a')).toHaveAttribute('href', '/sell')
  })
}) 