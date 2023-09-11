import React from 'react'
import Link from 'next/link'

const Form = ({type, post, setPost, submitting, handleSubmit}) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      {/**Form text fields with the prompt and the tag */}
      <p className='desc text-left max-w-md'>
        En esta sección podrás {type} tus comandos.
      </p>
      <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>Tu comando de IA</span>
          <textarea 
            value={post.prompt}
            onChange={(e) => setPost({...post, prompt:e.target.value})}
            placeholder='Escribe aquí tu comando'
            required
            className='form_textarea'
          />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>Etiqueta {` `}
            <span className='font-normal'>(#producto, #desarrolloweb, #idea)</span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({...post, tag:e.target.value})}
            placeholder='#etiqueta'
            required
            className='form_input'
          />
        </label>

        {/**Submit/cancel buttons */}
        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href="/" className='text-gray-500 text-sm'>
            Cancelar
          </Link>

          <button type='submit' disabled={submitting} className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form