'use client'

import { usePathname } from 'next/navigation'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Icons } from './Icons'
import Link from 'next/link'

const Footer = () => {
  const pathname = usePathname()
  const pathsToMinimize = [
    '/verify-email',
    '/sign-up',
    '/sign-in',
  ]

  return (
    <footer className='bg-white flex-grow-0'>
      <MaxWidthWrapper>
        <div className='border-t border-gray-200'>
          {pathsToMinimize.includes(pathname) ? null : (
            <div className='pb-8 pt-16'>
              <div className='flex justify-center'>
                <Icons.logo className='h-12 w-auto' />
              </div>
            </div>
          )}

          {pathsToMinimize.includes(pathname) ? null : (
            <div>
              <div className='relative flex items-center px-6 py-6 sm:py-8 lg:mt-0'>
                <div className='absolute inset-0 overflow-hidden rounded-lg'>
                  <div
                    aria-hidden='true'
                    className='absolute bg-zinc-50 inset-0 bg-gradient-to-br bg-opacity-90'
                  />
                </div>

                <div className='text-center relative mx-auto max-w-sm'>
                  <h3 className='font-semibold text-gray-900'>
                    Torne-se um vendedor
                  </h3>
                  <p className='mt-2 text-sm text-muted-foreground'>
                    Se você deseja vender produtos digitais de alta qualidade,
                    pode começar em minutos.{' '}
                    <Link
                      href='/sign-in?as=seller'
                      className='whitespace-nowrap font-medium text-black hover:text-zinc-900'>
                      Comece agora &rarr;
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className='py-10 md:flex md:items-center md:justify-between'>
          <div className='text-center md:text-left'>
            <p className='text-sm text-muted-foreground'>
              &copy; {new Date().getFullYear()} Todos os direitos
              reservados
            </p>
          </div>

          <div className='mt-4 flex items-center justify-center md:mt-0'>
            <div className='flex space-x-8'>
              <Link
                href='#'
                className='text-sm text-muted-foreground hover:text-gray-600'>
                Termos
              </Link>
              <Link
                href='#'
                className='text-sm text-muted-foreground hover:text-gray-600'>
                Política de Privacidade
              </Link>
              <Link
                href='#'
                className='text-sm text-muted-foreground hover:text-gray-600'>
                Política de Cookies
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer