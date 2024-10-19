import pg from 'pg';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from '../../utils/utilities.js';
import '../css/blogposts.css';

export default async function PostsPage() {
  const blogposts = (await db.query(`SELECT * FROM snowboarding_post`)).rows;
  console.log(blogposts);

  async function handleDeletePost(formData) {
    'use server';
    const postId = formData.get('postId');
    await db.query('DELETE FROM snowboarding_post WHERE id = $1', [postId]);
    revalidatePath('/blog');
  }

  return (
    <div className='container-box'>
      <h1 className='header'>C:\Users\Projects\ShredWithFriendsBlogPosts</h1>
      <ul className='blogPosts'>
        {blogposts.map((post) => (
          <li key={post.id} className='blogIndividual'>
            <Link className='blogIndividual-1' href={`/blog/${post.id}`}>
              {post.blog_post}
            </Link>
            <form action={handleDeletePost} className='deleteForm'>
              <input type='hidden' name='postId' value={post.id} />

              <button className='blogDelete' type='submit'>
                🗑️
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
