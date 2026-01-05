import React, { useEffect, useState } from 'react'
import PostHeader from './PostHeader';
import PostBody from './PostBody';
import PostFooter from './PostFooter';
import PostComment from './PostComment';
import { Link } from 'react-router-dom';
import { Button, Input, Spinner } from '@heroui/react';
import { createCommentApi, getCommentApi, updateCommentApi, deleteCommentApi } from '../../Services/CommentService';
import { useMutation } from '@tanstack/react-query';
import { deletePostApi } from '../../Services/PostService';
import { queryClient } from '../../main';

export default function PostCard({ post , commentsLimit , callback }) {

  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState( post.comments || [] );
  const [loading, setLoading] = useState( false );
  const [isUpdatingComment, setIsUpdatingComment] = useState( null );

    const { mutate: deletePost , isPending : isdeletingPost } = useMutation({
    mutationKey: ['deletePost'],
    mutationFn: ()=> deletePostApi(post._id),
    onSuccess: async (data)=>{
      await queryClient.invalidateQueries(['posts'])
    }
  })

  const { mutate: deleteCommentMutation } = useMutation({
    mutationKey: ['deleteComment'],
    mutationFn: (commentId)=> deleteCommentApi(commentId),
    onSuccess: async (data)=>{
      // تحديث التعليقات بعد الحذف
      const {comments: updatedComments} = await getCommentApi(post.id);
      setComments(updatedComments);
    }
  })

  function reverseComments() {
    let newComments = structuredClone(comments);
    newComments.reverse();
    setComments(newComments);
  }

  async function createComment(e) {
    e.preventDefault();

    setLoading(true);
    
    const response = await createCommentApi(commentContent , post.id );
    
    if (response.message == 'success') {
      setComments(response.comments);
      setCommentContent('');
    }

    setLoading(false);
  }

  useEffect( () => {
    reverseComments();

  }, []);

  // this function to up the comment content in the input to can update it
  function setFormForUpdate(comments) {
    setCommentContent(comments.content)
    setIsUpdatingComment(comments._id)
  }

  async function updateComment(e) {
    e.preventDefault();
    setLoading(true)
    const response = await updateCommentApi( commentContent , isUpdatingComment );
    if ( response.message === 'success' ) {
      const {comments} = await getCommentApi(response.comment.post);
      setComments( comments );
      setCommentContent('');
      setIsUpdatingComment(null);
    }
    setLoading(false)
  }

  function deleteComment(commentId) {
    deleteCommentMutation(commentId);
  }


  return (
    <div className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5 relative">

          { isdeletingPost &&
          <div className="bg-white/80 z-20 absolute inset-0 rounded-md flex items-center justify-center">
            <Spinner/>
          </div>
          }
          
          <PostHeader photo={post.user.photo} name={post.user.name} date={post.createdAt} userId={post.user._id } postId={post._id} callback={callback} deletePost={deletePost}/>

          <Link to={`/single-post/${post._id}`}>
          <PostBody body={post.body} image={post.image} />
          </Link>

          <PostFooter comments={comments} postId={post.id} />

          <form onSubmit={isUpdatingComment ? updateComment : createComment} className='flex gap-2'>
            <Input value={commentContent} onChange={ (e)=> setCommentContent(e.target.value) }  placeholder='Add Comment'/>
            <Button disabled={commentContent.length < 3 } isLoading={loading} type='submit' className="">Comment</Button>
          </form>

          { comments.length > 0 
          && 
          comments.reverse().slice( 0 , commentsLimit ).map( (comment) => <PostComment key={comment._id} comments={comment} userId={post.user._id } setFormForUpdate={setFormForUpdate} isUpdatingComment={isUpdatingComment} updateComment={updateComment} deleteComment={deleteComment} /> )
          }


        </div>
  )
}
