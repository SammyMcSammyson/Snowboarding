import Link from 'next/link';
import './css/home.css';
import Image from 'next/image';
import msword from '../public/microsoft word.png';
import Head from 'next/head';

export default function HomePage() {
  return (
    <div className='container-box'>
      <Head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <title>Shred With Friends</title>
      </Head>
      <h1 className='header'>C:\Users\Projects\ShredWithFriends\Home</h1>
      <div className='blogimage'>
        <Image src={msword} height={50} width={50} alt='ms word 2003' />
        <Link href={'/home'} className='home'>
          Home.docx
        </Link>
      </div>
    </div>
  );
}
