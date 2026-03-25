import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import QueryProvider from '@/components/providers/QueryProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'EFM - Equine Facility Management',
  description: 'Equine Facility Management System',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `if(localStorage.getItem('efm-theme')==='light')document.documentElement.classList.add('light')`,
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <QueryProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner position="top-center" />
              {children}
            </TooltipProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
