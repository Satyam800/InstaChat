import React, { useEffect } from 'react'
import Header from './Home/Header'
import postBox from './postBox'
import { useSelector } from 'react-redux'
import { formatDistanceToNow } from 'date-fns';

const Body = () => {

  const postTweet=useSelector(store=>store.post.create)
  // const formattedTime = formatDistanceToNow(new Date(postTweet.createdAt), { addSuffix: true });

  useEffect(()=>{
console.log(postTweet,"ppposst");
  },[postTweet])
  return (
    <div className='grid grid-cols-4 h-screen  gap-4  '>
    <div className=''>
<Header/>
    </div>
    <div className=' col-span-2'>
{
  postTweet?.content
  
}
{/* <span>{formattedTime}</span> */}

<div className='h-[30%] w-[30%]'>
  {
    postTweet?.image?.map((i)=>{
     return <div>
       <img src={i} className='w-20 h-20'/>
     </div>
       
      
    })
  }
</div>
    </div>
    <div className='  bg-slate-200 '></div>
    </div>
  )
}

export default Body