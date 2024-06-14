import React, { useEffect, useRef, useState } from 'react'
import Header from './Home/Header'
import postBox from './postBox'
import { useSelector } from 'react-redux'
import { AllComment, followingFeed, mostLiked, profileFetch } from '../slice/postSlice';
import { useDispatch } from 'react-redux';
import { fetchTweet } from '../slice/postSlice';
import TweetCard from './tweetCard';
import PostBox from './postBox';
import { ShimmerSocialPost } from "react-shimmer-effects";
import { FaCircleUser } from "react-icons/fa6";
import { following } from '../slice/postSlice';
import { follow } from '../slice/postSlice';
import { followingProfile } from '../slice/postSlice'
import { TbMessageCircleSearch } from "react-icons/tb";
import {hastagTweet,hastagResult} from "../slice/postSlice"
import { SpinnerCircular } from "spinners-react";

const Body = () => {
  const [setoff,setSetoff]=useState(0)
  let postTweet=useSelector(store=>store.post.create)
  const editProfile=useSelector(store=>store.post.profiles)
  const isBox=useSelector(store=>store.post.box)
  const user = JSON.parse(localStorage.getItem("id"))?._id
  const users = JSON.parse(localStorage.getItem("id"))
   const followings=useSelector(store=>store.post.followings)
   const followingProf=useSelector((store)=>store.post.followingProfiles)
   const [feed,setFeed]=useState(1)
   const [index,setIndex]=useState(5)
   const [fixedfollwing,setfixedfollowing]=useState(followings?.slice(0,index))
   const [hashtagSearch,setHashtagSearch]=useState(false)
   const hastagSearchRef=useRef(null)
   const removetagRef=useRef()
   const searchIconRef=useRef()
   const tagSugg=useSelector(store=>store.post.hastagSugg)
const dispatch=useDispatch()
const [isfollowclicked,setIsfollowClicked]=useState(false)
const [followId,setFollowId]=useState('')
  // const formattedTime = formatDistanceToNow(new Date(postTweet.createdAt), { addSuffix: true });
  useEffect(()=>{
    dispatch(profileFetch({
      user:user
    }))
    dispatch(following({
      user:user
    }))

    dispatch(followingProfile({
      user:user
    }))
  },[])

  useEffect(()=>{
    if(feed==1){
      dispatch(fetchTweet(
        { user:user,
         setoff:setoff         
        }
       ))
    }

    if(feed==2){
      dispatch(mostLiked({
        user:user
      }))
    }
    if(feed==3){
      dispatch(followingFeed({
        user:user
      }))
    }
  },[feed])
 
  useEffect(()=>{

  },[isBox])

  useEffect(()=>{
  },[editProfile,followingProf,tagSugg])
useEffect(()=>{

},[postTweet])

useEffect(()=>{
setIsfollowClicked(false)
setfixedfollowing(followings?.slice(0,index))
},[followings])

const handlefollow=(id,i)=>{
 setIsfollowClicked(true)
  
dispatch(follow({
user:user,
id:id,

}))
setFollowId(id)
setTimeout(()=>{
  dispatch(following({
    user:user
  }))
},1000)

}

const handleMyfeed=()=>{
setFeed(1)
}
const handleMostViewed=()=>{
setFeed(2)
}
const handleFollowing=()=>{
setFeed(3)
}

const handlehastagSearch=(e)=>{
dispatch(hastagTweet({
  text:e.target.value
}))
}

const handleHastag=(i)=>{
  setHashtagSearch(false)
console.log(i);
dispatch(hastagResult({
  text:i
}))
}

useEffect(()=>{


  const handleRemove=(e)=>{
   if( !removetagRef?.current?.contains(e.target)){
    console.log(e.target,"dd");
    setHashtagSearch(false)
   }
  }
  const remove=document.addEventListener('click',handleRemove)
},[])

const [isLoading,setisLoading]=useState(false)
const onScroll = () => {
  
  console.log("onscrollBar")
  if (window.innerHeight+document.documentElement.scrollTop+2>=document.documentElement.scrollHeight){
    console.log("setoff")
    setSetoff(setoff+10)
  }
  dispatch(fetchTweet(
    { user:user,
     setoff:setoff
    }
   ))

}
useEffect(() => {
  window.addEventListener('scroll',onScroll)
  return () => window.removeEventListener('scroll', onScroll)
}, [])
  return (
    <div className='relative grid grid-cols-4 h-screen gap-4 sm:bg-white bg-black   '>
  {isBox?<div className='z-100 absolute h-screen w-screen'><PostBox/></div>:null}
    <div className=''>
     <Header/>
    </div>
    <div className='sm:col-span-2 col-span-4 overflow-y-scroll scroll-smooth '>

{/* <span>{formattedTime}</span> */}

<div className='z-0 flex flex-col  py-3 '>

  <div className=' overflow-x-scroll no-scrollbar sm:w-[80%] w-full'>
    <div className=''>
    <div className='flex   w-[95%]  py-2'>
    {followingProf?
      followingProf.map((i)=>{
        return <div className='w-12 h-12 ml-5 mr-5 flex-shrink-0 rounded-full outline-cyan-400  outline-dotted border-red-400'>
        <img src={i.image[0]} className='w-12 h-12 rounded-full '/>
        </div>
      }):null
    }
    </div>
    </div>

  </div>

<div className='flex sm:flex-row flex-col  px-3 cursor-pointer  mt-5 justify-start' >
 <div className='flex'>
 <span className={`h-6 w-24 rounded-2xl ${feed==1?"bg-green-300":"bg-yellow-100"} text-cyan-400 mr-4 pl-4`} onClick={handleMyfeed}>My feed</span>
  <div className={`h-6 w-24 rounded-2xl ${feed==2?"bg-green-300":"bg-yellow-100"} text-cyan-400 mr-4 pl-4`} onClick={handleMostViewed}>Most Liked</div>
  <span className={`h-6 w-24 rounded-2xl ${feed==3?"bg-green-300":"bg-yellow-100"} text-cyan-400 mr-4 pl-4`} onClick={handleFollowing}>following</span>
 </div>
  <div className='flex sm:mt-0 mt-5' ref={removetagRef}>
  <TbMessageCircleSearch className='w-6 h-6 rounded-full sm:bg-slate-100 bg-white' ref={searchIconRef} size="29" onClick={()=>setHashtagSearch(!hashtagSearch)}/>
  {hashtagSearch? 
  <div className='relative ' >
    <input onChange={handlehastagSearch} placeholder='search hashtag...' className=' px-3 ml-9 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'/>
      {tagSugg?<div className='absolute flex flex-col mt-3 ml-5  p-2  h-auto w-full outline-yellow-300 bg-yellow-100 opacity-75  border-1 border-yellow-200 rounded-lg'>
      {
        tagSugg?.map((i)=>{
          return <div className='py-2 text-xl font-serif ' onClick={()=>handleHastag(i)}>
              <div className='flex justify-center'>{i}</div>
              <hr/>
          </div>
        })
      }

      </div>:<div className='h-6 tex-xl'>"No search result"</div>}
  </div>:null }

  </div>
</div> 

  {postTweet==[]?
  ["","","",""].map((i)=>{
    return <div>
       <ShimmerSocialPost type="image" />
        <ShimmerSocialPost type="both" />
        <ShimmerSocialPost type="text" />
        <ShimmerSocialPost type="text" title />
      </div>
  })
  :
   postTweet?.map((i)=>{

     return <div>
       {feed==1||feed==3?<TweetCard data={i} profile={editProfile} key={i._id} feed={feed}/>:
       <TweetCard data={i.postId} profile={editProfile} key={i._id} time={i.createdAt} feed={feed}/>
       }
     </div>
       
    })
  }
</div>
    </div>
    <div className='sm:block hidden overflow-y-scroll  bg-slate-100 '>
     <div className=''>
     <div className='m-4 flex'>
     {editProfile?<img src={editProfile.image[0]} className='w-10 h-10 rounded-full flex-shrink-0  font-semibold'/>
     :<FaCircleUser size={32}/>}
  <div className='flex flex-col ml-3' >
  {users?.name}
  <span className='text-slate-300 text-xs'>{users?.email}</span>
  </div>
  <span className='text-red-300 text-xl ml-[20%]'>You</span>
     </div>
     <hr/>
     <span className='m-4 text-xl text-slate-400'>Suggestions for you</span>
     <div className='flex flex-col'>
      {
       followings?.map((i,j)=>{
          return <div className='w-[70%] flex tex-xl py-3'>
            <img src={i?.image?.[0]} className='h-9 w-9 rounded-full ml-2'/>
         <span className='ml-4'> {`${i?.fname}  ${i?.lname}`}</span>
        {isfollowclicked&&followId==i?.user?._id?
        <SpinnerCircular size={30} color="white" speed={70}/>
        : <button onClick={()=>handlefollow(i?.user?._id,j)} className='w-12 relative bg-black text-white p-1 text-xs h-6 rounded-lg ml-[17%]'>Follow</button>}
          </div>
        })
      }
     </div>
     </div>
    </div>
   {
    <SpinnerCircular size={30} color="white" speed={70} />

   }
    </div>
  )
}

export default Body