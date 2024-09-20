import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nolatech | Iniciar Sesión',
  description: 'Nolatech Test'
}

export default function LoginLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {children}
    </section>
  )
}
