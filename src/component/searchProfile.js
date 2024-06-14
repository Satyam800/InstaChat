import React,{useEffect} from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { useSelector,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { userSearchProfile } from '../slice/postSlice';
import Header from './Home/Header';
const SearchProfile = () => {
  const dispatch=useDispatch()
  const Params=useParams()
  const editProfile=useSelector(store=>store.post.specificProfile)
console.log(Params,"params");
useEffect(()=>{
dispatch(userSearchProfile({
  name:Params?.name
}))
},[])

useEffect(()=>{

},[editProfile])
  return (
    <div>
      <Header/>
    <div className="z-0 sm:ml-[25%] ml-3 sm:w-[40%] w-[80%] sm:h-[40%] h-[45%] bg-white shadow-sm rounded-md sm:p-5 p-1">
        <div className={` flex h-32 w-32 ${editProfile?"bg-white":"bg-pink-300"} rounded-full cursor-pointer`}>
         { editProfile?<img src={editProfile?.image?.[0]} className=" z-0 relative m-1 h-[90%] w-[90%] rounded-full border-dotted border-2 border-indigo-600"/>: <FaCircleUser size={120} className="absolute m-1" />}
         </div >
         <div className="flex w-[50%] justify-between py-5 text-red-300">
         <div>posts</div>
         <div>follower</div>
         <div>following</div>
         </div>
        <div className="py-2 m-1">
         <div className=' text-xl font-semibold'>{`${editProfile?.lname}`}</div>
         <div>{editProfile?.bio}</div>
         <a>{editProfile?.url}</a>
        </div>
         
        <div className="  w-[50%] pl-[17%] h-6 bg-slate-200 rounded-md shadow-lg cursor-pointer" >Follow</div>
        </div>
       
   <hr className=" mt-5 w-full  bg-slate-500"/>
         </div>
  )
}

export default SearchProfile