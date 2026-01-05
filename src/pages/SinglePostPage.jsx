import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPostApi } from '../Services/PostService';
import LoadingScreen from '../Components/LoadingScreen';
import PostCard from '../Components/Post/PostCard';

export default function SinglePostPage() {

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  const { id } = useParams();

  async function getPost() {

    const response = await getPostApi(id);
    if ( response.message == 'success' ) {
      setPost(response.post);
    }
    setLoading(false);
  }

  useEffect(() => {
    getPost();
  }, [] );
  

  return <>
    <div className="SinglePostPage w-full md:w-xl mx-auto">
      { loading ? <LoadingScreen /> 
    :
    <PostCard post={post} commentsLimit={post.comments.length + 1} />
    }
    </div>
  </>
}
