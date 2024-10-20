import pg from 'pg';
import { db } from '../../../utils/utilities.js';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import '../../css/blogpostsid.css';

export default async function IdPage({ params }) {
  const { id } = params; //getting params

  let blogPostsArray = []; //after some googling of errors found I needed an array

  const blogPost = await db.query(
    `SELECT * FROM snowboarding_post WHERE id = $1`,
    [id]
  );
  blogPostsArray = await blogPost.rows; //filling the array

  let blogCommentsArray = []; //same code just getting comments

  const blogComments = await db.query(
    `SELECT * FROM snowboarding_comments 
   JOIN snowboarding_post ON snowboarding_comments.blog_id = snowboarding_post.id 
   WHERE snowboarding_post.id = $1`,
    [id]
  );
  console.log('this is blogComment', blogComments);
  console.log('this is my testing blogpost', blogPost);

  blogCommentsArray = await blogComments.rows;
  console.log(blogCommentsArray);

  async function handlePost(formData) {
    'use server';
    console.log('Saving post to the database...');

    const comments = formData.get('comment');
    const blogID = formData.get('blog_ID');

    await db.query(
      `
        INSERT INTO snowboarding_comments (comments, blog_id) 
        VALUES ($1, $2)
    `,
      [comments, blogID]
    );

    console.log('Post saved!');
    revalidatePath(`/blog/${id}`);

    redirect(`/successful`);
  }

  async function handleDeletePost(formData) {
    'use server';
    const postId = formData.get('postId');
    console.log(postId);
    await db.query('DELETE FROM snowboarding_comments WHERE comments = $1', [
      postId,
    ]);
    revalidatePath(`/blog/${id}`);
  }

  return (
    <div className='container-box'>
      {blogPostsArray.map((post) => (
        <div key={post.id}>
          <h1 className='header'>
            C:\Users\Projects\ShredWithFriends\BlogPosts\{post.blog_post}
          </h1>
        </div>
      ))}

      <div className='post'>
        {blogPostsArray.map((post) => (
          <div key={post.id}>
            <div className='post-1'>
              <h1>{post.blog_post}</h1>
              <p>{post.blog_text}</p>
            </div>
          </div>
        ))}

        <div>
          <div className='post-2'>
            <h2>Comments</h2>
            {blogCommentsArray.map((comment, index) => (
              <div key={index}>
                <div className='post-3'>
                  <p>{comment.comments}</p>
                  <form action={handleDeletePost} className='deleteForm'>
                    <input
                      type='hidden'
                      name='postId'
                      value={comment.comments}
                    />
                    <button className='blogDelete' type='submit'>
                      🗑️
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <form action={handlePost} className='addComment'>
        <label htmlFor='comment'>Add comment</label>
        <input id='comment' name='comment' type='text' />
        <input type='hidden' name='blog_ID' value={id} />

        <button type='submit'>Save</button>
      </form>
    </div>
  );
}
