import React from 'react'

export default function PostBody( { body , image } ) {
  return <>
    { body && <p>{ body }</p> }
    { image && <img className='rounded-medium max-h-80 w-full object-cover block' src={image} alt={body} /> }
  </>
}
