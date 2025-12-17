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
      <body className={`bg-primary-900 text-primary-100 ${josefin.className}`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
