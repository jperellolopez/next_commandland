"use client"

import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {
  const {data: session} = useSession()
  const pathName = usePathname()
  const router = useRouter()

  const [copied, setCopied] = useState("")

  // function to handle the copy prompt button. It adds a delay after being pressed, when it is gonna show a tick icon
  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => 
      setCopied(""), 3000
    );
  }

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        {/**User tag (name and mail) */}
        <div 
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={() => {}}>
          <Image 
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>{post.creator.username}</h3>
            <p className='font-inter text-sm text-gray-500'>{post.creator.email}</p>
          </div>
        </div>
        {/**copy button */}
        <div className='copy_btn' onClick={handleCopy}>
          <Image 
            src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            width={12}
            height={12}
            alt='icon_copy'
          />
        </div>
      </div>
      {/**Prompt text and tag */}
      <p className='my-4 font-satoshi text-sm text-gray-700'>
        {post.prompt}
      </p>
      <p 
      className='font-inter text-sm blue_gradient cursor-pointer'
      onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {/* check if the current logged user is the creator of the post and if is located at the profile page. Only if this is true the options of delete and edit post will be shown */}
      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p className='font-inter text-sm green_gradient cursor-pointer' onClick={handleEdit}>Editar</p>
          <p className='font-inter text-sm orange_gradient cursor-pointer' onClick={handleDelete}>Borrar</p>
        </div>
      )}
    </div>
  )
}

export default PromptCard