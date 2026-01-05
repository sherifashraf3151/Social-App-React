import React, { useContext } from 'react'
import { formatDate } from '../../Services/DateHelper'
import placeHolderImage from '../../assets/profile.png'
import { Button } from '@heroui/react'
import { AuthContext } from '../../Context/AuthContext'

export default function PostComment( { comments , userId , setFormForUpdate, isUpdatingComment, deleteComment } ) {

  const {userData} = useContext(AuthContext);

  return <>

  

  <div className="flex items-center space-x-2 p-4 text-md ">

            
            <div className="flex shrink-0 self-start cursor-pointer">
              <img onError={(e)=> e.target.src = placeHolderImage } src={comments.commentCreator.photo} alt={comments.commentCreator.name} className="h-8 w-8 object-fill rounded-full" />
            </div>

            <div className="flex items-center justify-center space-x-2">
              <div className="block">

                <div className="bg-gray-100 w-auto rounded-xl px-2 pb-2 relative overflow-hidden mb-2">
                  { isUpdatingComment && <div className='absolute inset-0 bg-black/30 '></div>}
                  <div className="font-medium">
                    <h2>{comments.commentCreator.name}</h2>
                  </div>
                  <div className="">
                    { comments.content }
                  </div>
                </div>

                <div className="flex justify-start items-center w-full">
                  <div className="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">

                    {
                      userId === userData._id && userData._id === comments.commentCreator._id &&
                      <>
                      <span onClick={ ()=> setFormForUpdate(comments) } className='cursor-pointer underline underline-offset-2 text-sm hover:text-blue-600 duration-300 border rounded-md px-2 py-1' >Update</span>
                      <span onClick={() => deleteComment(comments._id)} className='cursor-pointer underline underline-offset-2 text-sm hover:text-red-500 duration-300  border rounded-md px-2 py-1' >Delete</span>
                      </>
                    }
                    
                    {/* <small className="self-center">.</small> */}

                    <small>{ formatDate(comments.createdAt) }</small>
                  </div>
                </div>
              </div>
            </div>

          </div>
  </>
}
