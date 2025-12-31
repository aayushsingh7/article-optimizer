import React from 'react'

const Loader = ({text}) => {
  return (
    <div className='h-[400px] w-full flex items-center justify-center flex-col px-10'>
         <div className='loader'/>
         <span className='mt-[20px] inline-block font-bold text-lg'>{text}</span>
         <span className='font-bold text-gray-400 text-lg text-center'>Render.com may take up to 50 seconds to respond (free hosting).</span>
    </div>
  )
}

export default Loader