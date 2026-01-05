import { Button , Textarea } from '@heroui/react'
import React, { useState } from 'react'
import { createPostApi } from '../Services/PostService';
import { queryClient } from '../main';

export default function PostForm( { getAllPosts } ) {

  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageName, setImageName] = useState('');
  const [imageUrl, setImageUrl] = useState('');


  function handleImage(e) {
    setImage(e?.target.files[0]);
    setImageName(e?.target.files[0]?.name);
    setImageUrl( e && URL.createObjectURL(e.target.files[0]));
    if (e) {
      e.target.value = '';
    }
  }

  async function createPost(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    body && formData.append('body' , body );
    image && formData.append('image' , image );

    const response = await createPostApi(formData);

    if ( response.message == 'success' ) {
      await queryClient.invalidateQueries(['posts'])
      setBody('');
      setImage(null);
      setImageName('');
      setImageUrl('');
    }
    setLoading(false);
  }

  return <>
  <div className="p-4 mt-4 rounded-md shadow bg-white w-full my-5">
    <form onSubmit={createPost}>
      <Textarea value={body} onChange={(e)=> setBody(e.target.value)} placeholder='What are you thinking about?'></Textarea>
      
      { imageUrl && 
      <div className='my-2 relative'>
        <svg xmlns="http://www.w3.org/2000/svg" onClick={ ()=> handleImage(null) } fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 absolute top-2 end-2 bg-white rounded-md cursor-pointer"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
        <img src={imageUrl} alt={imageName} className='w-full rounded-md'/>
      </div>
      }
      
      <div className="flex mt-2 justify-between items-center">
        <label className='flex gap-1 bg-green-500 p-2 rounded-md cursor-pointer hover:text-white duration-300 hover:scale-105'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          <input onChange={handleImage} type="file" className='hidden'/>
        </label>
          <span>{imageName}</span>
        
        <Button disabled={ !(body || image) } isLoading={loading} type='submit' className="bg-blue-500 hover:text-white hover:bg-blue-700 duration-300 hover:scale-105">Post</Button>
      </div>

    </form>
  </div>
  </>
}
