import MaxWidhtWrapper from '@/components/MaxWidhtWrapper'
import { Button, buttonVariants } from '@/components/ui/button'
import { CheckCircle, Leaf, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

const perks = [
  {
    name: 'Delivery Instantâneo',
    Icon: ShoppingCart,
    description: 'Receba a confirmação do seu pedido por e-mail em segundos.',
  },
  {
    name: 'Qualidade Garantida',
    Icon: CheckCircle,
    description: 'Todos os produtos passam por uma rigorosa verificação de qualidade.',
  },
  {
    name: 'Pelo Planeta',
    Icon: Leaf,
    description: 'Nossos produtos são selecionados com responsabilidade ambiental em mente.',
  },

]

export default function Home() {
  return (
    <>
      <MaxWidhtWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
            Produtos de alta qualidade, direto pra{' '}
            <span className='text-violet-600'>
              você
            </span>
            .
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Bem-vindo(a) à DigitalHippo. Aqui, a qualidade é garantida, nossa
            equipe verifica cada item para os mais altos padrões.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 mt-6'>
            <Link href="/products" className={buttonVariants()}>Navegar pelas Tendências</Link>
            <Button variant="ghost">Conheça nossos padrões de qualidade &rarr;</Button>
          </div>
        </div>

        {/*TODO: lista de produtos */}
      </MaxWidhtWrapper>

      <section className='border-t border-gray-200 bg-gray-50'>
        <MaxWidhtWrapper className='py-20'>
          <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg-gap-y-0'>
            {perks.map((perk) => (
              <div
                key={perk.name}
                className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'>
                <div className='md:flex-shrink-0 flex justify-center'>
                  <div className='h-16 w-16 flex items-center justify-center rounded-full bg-violet-100 text-violet-900'>
                    {<perk.Icon className='h-1/3 w-1/3' />}
                  </div>
                </div>

                <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
                  <h3 className='text-base font-medium text-gray-900'>
                    {perk.name}
                  </h3>
                  <p className='mt-3 text-sm text-muted-foreground'>
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidhtWrapper>
      </section>
    </>
  )
}
