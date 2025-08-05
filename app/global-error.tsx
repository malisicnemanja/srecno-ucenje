'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Globalna greška!</h2>
          <button onClick={reset} className="bg-red-600 text-white px-4 py-2 rounded">
            Osveži stranicu
          </button>
        </div>
      </body>
    </html>
  )
}