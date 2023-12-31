//import 'dotenv/config'
import * as dotenv from 'dotenv';
import '@/styles/index.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Header from '../components/Header/Header';
import Navigation from '../components/Navigation/Navigation';
import Providers from './Providers'
import QueryWrapper from '@/components/wrappers/query-wrapper';

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

interface Props {
  children: React.ReactNode;
}
export default function RootLayout(props: Props) {
  return (

    <html lang="en" className={poppins.className}>
      <body className="bg-white text-base text-neutral-900">

        <Providers>
          <div className=''>
            <Header />
            <Navigation />
            {props.children}
          </div>
        </Providers>

      </body>
    </html>

  )
}
