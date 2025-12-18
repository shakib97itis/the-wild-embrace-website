import {Josefin_Sans} from 'next/font/google';

import '@/app/_styles/globals.css';
import Header from '@/app/_components/Header';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-josefin-sans',
});

export const metadata = {
  title: {
    default: 'The Wild Embrace',
    template: '%s | The Wild Embrace',
  },
  description:
    'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body
        className={`bg-primary-900 text-primary-100 min-h-dvh grid grid-rows-[auto_1fr] ${josefin.className}`}
      >
        <Header />
        <div className="px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full grid">{children}</main>
        </div>
      </body>
    </html>
  );
}
