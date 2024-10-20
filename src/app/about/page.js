import '../css/about.css';
import Image from 'next/image';
import msword from '../../public/microsoft word.png';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className='container-box'>
      <h1 className='header'>C:\Users\Projects\ShredWithFriends\About</h1>
      <div className='blogimage'>
        <Image src={msword} height={50} width={50} alt='ms word 2003' />
        <Link href={'/about/abouttext'} className='about'>
          about.docx
        </Link>
      </div>
    </div>
  );
}
