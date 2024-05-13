import React, { useEffect, useState } from 'react'
import Header from './Home/Header'
import postBox from './postBox'
import { useSelector } from 'react-redux'
import { profileFetch } from '../slice/postSlice';
import { useDispatch } from 'react-redux';
import { fetchTweet } from '../slice/postSlice';
import TweetCard from './tweetCard';
import PostBox from './postBox';
const Body = () => {
  const [setoff,setSetoff]=useState(0)
  let postTweet=useSelector(store=>store.post.create)
  const editProfile=useSelector(store=>store.post.profiles)
  const isBox=useSelector(store=>store.post.box)
  const user = JSON.parse(localStorage.getItem("id"))?._id
const dispatch=useDispatch()
  // const formattedTime = formatDistanceToNow(new Date(postTweet.createdAt), { addSuffix: true });
  useEffect(()=>{
    dispatch(profileFetch({
      user:user
    }))

    dispatch(fetchTweet(
     { user:user,
      setoff:setoff
      
     }
    ))
  },[])
 
  useEffect(()=>{

  },[isBox])

  useEffect(()=>{
   console.log(editProfile,"edittPr;ojvcr");
  },[postTweet,editProfile])




  return (
    <div className='relative grid grid-cols-4 h-screen gap-4 sm:bg-white bg-black   '>
  {isBox?<div className='z-100 absolute h-screen w-screen'><PostBox/></div>:null}
    <div className=''>
     <Header/>
    </div>
    <div className='sm:col-span-2 col-span-4 overflow-y-scroll scroll-smooth '>

{/* <span>{formattedTime}</span> */}

<div className='z-0 flex flex-col py-3 '>
  {
   postTweet?.map((i)=>{
     return <div>
       <TweetCard data={i} profile={editProfile} key={i._id}/>
     </div>
       
    })
  }
</div>
    </div>
    <div className='sm:block hidden  bg-slate-200 '></div>
    </div>
  )
}

export default Body