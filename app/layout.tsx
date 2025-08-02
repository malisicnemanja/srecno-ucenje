import './globals.css'
import Header from '@/components/layout/Header'

export const metadata = {
  title: 'Srećno učenje - Franšiza obrazovne metodologije',
  description: 'Postanite deo mreže koja je već inspirisala 20.000+ dece da uče srcem',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sr">
      <body>
        <Header />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}
