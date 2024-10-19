import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from '../../utils/utilities.js';
import '../css/addSubmission.css';

export default async function PostsPage() {
  async function handleBlog(formData) {
    'use server';
    console.log('Saving post to the database...');

    const blogPost = formData.get('Title');
    const category = formData.get('category');
    const blogText = formData.get('post');

    await db.query(
      `INSERT INTO snowboarding_post (blog_post, category, blog_text) 
        VALUES ($1, $2, $3)    `,
      [blogPost, category, blogText]
    );

    console.log('Blog working');

    revalidatePath('/blog');
    redirect('/blog');
  }

  return (
    <div className='container-box'>
      <h1 className='header'>
        C:\Users\Projects\ShredWithFriends\Add Submission
      </h1>
      <div className='post'>
        <form action={handleBlog} className='formSubmission'>
          <label htmlFor='Title'>Add Title</label>
          <input
            id='Title'
            name='Title'
            type='text'
            required
            className='input'
          />
          <label htmlFor='category'>Select Category</label>
          <select id='category' name='category' required className='input'>
            <option value='lifestyle'>Lifestyle</option>
            <option value='gear'>Gear</option>
            <option value='techniques'>Techniques</option>
            <option value='events'>Events</option>
            <option value='travel'>Travel</option>
            <option value='news'>News</option>
          </select>
          <label htmlFor='post'>Add Post</label>
          <textarea
            id='post'
            name='post'
            type='text'
            required
            className='input1'
          ></textarea>

          <button type='submit' className='input'>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
