import { render, screen } from '@testing-library/react'
import VerifyEmail from '@/components/VerifyEmail'
import { trpc } from '@/trpc/client'

// Mock tRPC
const mockedUseQuery = jest.fn()
jest.mock('@/trpc/client', () => ({
  trpc: {
    auth: {
      verifyEmail: {
        useQuery: (params: any) => mockedUseQuery(params),
      },
    },
  },
}))

describe('VerifyEmail', () => {
  it('renders loading state', () => {
    mockedUseQuery.mockReturnValue({ isLoading: true, isError: false, data: null })
    render(<VerifyEmail token="test-token" />)
    expect(screen.getByText('Verifying...')).toBeInTheDocument()
    expect(screen.getByText("This won't take long.")).toBeInTheDocument()
  })

  it('renders success state', () => {
    mockedUseQuery.mockReturnValue({ isLoading: false, isError: false, data: { success: true } })
    render(<VerifyEmail token="test-token" />)
    expect(screen.getByText("You're all set!")).toBeInTheDocument()
    expect(screen.getByText('Thank you for verifying your email.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Login' })).toBeInTheDocument()
  })

  it('renders error state', () => {
    mockedUseQuery.mockReturnValue({ isLoading: false, isError: true, data: null })
    render(<VerifyEmail token="test-token" />)
    expect(screen.getByText('There was a problem')).toBeInTheDocument()
    expect(screen.getByText('This token is not valid or might be expired. Please try again.')).toBeInTheDocument()
  })
})
