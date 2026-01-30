import React, { useContext, useState } from 'react'
import { formatDate } from '../../Services/DateHelper'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import { AuthContext } from '../../Context/AuthContext'
import { deletePostApi } from '../../Services/PostService';
import { useMutation } from '@tanstack/react-query';

export default function PostHeader({ photo , name , date , userId , postId , callback , deletePost }) {

  const {userData} = useContext(AuthContext);

  // async function deletePost() {
  //   setIsDeletingPost(true)
  //   const response = await deletePostApi(postId);
  //   if ( response.message == 'success' ) {
  //     await callback()
  //   }
  //   setIsDeletingPost(false)
  // }



  return (
    <div className="w-full h-16 flex items-center justify-between ">
            
            <div className="flex">
              <img className=" rounded-full w-10 h-10 mr-3" src={photo} alt={name} />
              <div>    
                <h3 className="text-md font-semibold ">{name}</h3>
                <p className="text-xs text-gray-500">{formatDate(date)}</p>
              </div> 
            </div>

            {userData?._id === userId && 
            <Dropdown>
              <DropdownTrigger>
                <svg className="w-16 cursor-pointer outline-0" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} /></svg>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="edit">Update Post</DropdownItem>
                <DropdownItem key="delete" onClick={deletePost} className="text-danger" color="danger">Delete Post</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            }

            
          </div>
  )
}
