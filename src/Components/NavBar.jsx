import Link from 'next/link';
import './NavBar.css';

export default function NavBar() {
  return (
    <div>
      <div className='top-bar'>
        <div className='top-bar-title'>File Explorer</div>
        <div className='top-bar-icons'>
          <button className='icon-button'>–</button>
          <button className='icon-button'>◻</button>
          <button className='icon-button'>×</button>
        </div>
      </div>

      <nav className='navbar'>
        <Link href='/' className='nav-link'>
          Home
        </Link>
        <Link href='/about' className='nav-link'>
          About
        </Link>
        <Link href='/blog' className='nav-link'>
          Blog
        </Link>
        <Link href='/addSubmission' className='nav-link'>
          Add Submission
        </Link>
      </nav>
    </div>
  );
}
