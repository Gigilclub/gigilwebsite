export const metadata = { title: 'Gigil', description: 'Gifting cum blog' };
import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        <header className="border-b border-gray-100 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.svg" alt="Gigil" className="h-8 w-8" />
              <span className="text-xl font-semibold text-gigil-teal">Gigil</span>
            </Link>
            <nav className="flex gap-6">
              <Link className="hover:text-gigil-teal" href="/">Gifting</Link>
              <Link className="hover:text-gigil-teal" href="/blog">Blog</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="mt-12 border-t border-gray-100 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-500">© {new Date().getFullYear()} Gigil</div>
        </footer>
      </body>
    </html>
  );
}

