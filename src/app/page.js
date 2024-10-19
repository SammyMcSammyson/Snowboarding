import Link from 'next/link';
import './css/home.css';
import Image from 'next/image';
import msword from '../app/images/microsoft word.png';

export default function HomePage() {
  return (
    <div className='container-box'>
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
