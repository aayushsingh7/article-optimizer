import React from 'react'

const Loader = ({text}) => {
  return (
    <div className='h-[500px] w-full flex items-center justify-center flex-col'>
         <div className='loader'/>
         <span className='mt-[20px] inline-block font-bold text-lg'>{text}</span>
    </div>
  )
}

export default Loader