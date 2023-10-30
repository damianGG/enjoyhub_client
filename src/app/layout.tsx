//import 'dotenv/config'
import * as dotenv from 'dotenv';
import '@/styles/index.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Header from '../app/components/Header/Header';
import Navigation from '../app/components/Navigation/Navigation';


dotenv.config();
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: 'EnjoyHub',
  description: 'Centrum z najlepszymi miejscami rozrywki i aktywności',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en" className={poppins.className}>
      <body className="bg-white text-base text-neutral-900">
        <Header />
        <div className=''>
          <Navigation />
          {children}

        </div>
      </body>
    </html>

  )
}
