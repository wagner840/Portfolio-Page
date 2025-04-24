import type {Metadata} from 'next';
import {Geist, Geist_Mono, Grenze_Gotisch} from 'next/font/google';
import './globals.css';
import { EmoModeProvider } from '@/components/emo-toggle-button';
import { BloodEffect } from '@/components/blood-effect';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const grenzeGotisch = Grenze_Gotisch({
  variable: '--font-grenze-gotisch',
  subsets: ['latin'],
  weight: '400', // Specify a weight if needed
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Portfolio de IA - Wagner Guilherme',
  description: 'Portfolio de aplicações e projetos de Inteligência Artificial de Wagner Guilherme.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} ${grenzeGotisch.variable} antialiased`}>
        <EmoModeProvider>
          <>
            <BloodEffect />
            {children}
          </>
        </EmoModeProvider>
      </body>
    </html>
  );
}

