import React, { useEffect, useState } from 'react'
import {name,email,token} from "../../utils/constant"
import { useDispatch, useSelector } from 'react-redux';
import { IoIosLogOut } from "react-icons/io";
import { GoSignIn } from "react-icons/go";
import { Link } from 'react-router-dom';
import { FaCirclePlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { PostCard } from '../../slice/postSlice';
import PostBox from '../postBox';
const Header = () => {
  const [signin,SetSignIn]=useState(true)
  const [logout,SetLogout]=useState(false)
  const [isPostPopUp,setisPopUp]=useState(false)
  
  const dispatch=useDispatch()
  const isBox=useSelector(store=>store.post.postBox)
const handleClick=()=>{
  localStorage.removeItem("id")
  localStorage.removeItem("token")
  SetLogout(true)
}

const handlePostBox=()=>{
 dispatch(PostCard(true))
 setisPopUp(true)
}

useEffect(()=>{
  setisPopUp(false)
   
},[isBox])

  return (
    <> 
    {isBox?<div className='absolute top-0 h-full w-full'><PostBox/></div>:null}
    <div className='absolute p-4 sm:h-full sm:w-[20%]  sm:top-0 bottom-0 w-full justify-between  flex sm:flex-col  flex-row sm:shadow-none  shadow-2xl bg-black '>
    <div className='sm:flex hidden justify-start  sm:w-24 w-12  text-xl text-white'>Logo</div>
  {/* <div className='flex rounded-full h-10 bg-white text-slate-900 focus:bg-amber-600 '></div> */}
     <CiSearch size={22} className='sm:m-2 mt-2 h-8 w-8 border-red-500 border-2 bg-white rounded-full' />
    {/* <input type='text' className='rounded-full focus:outline-none sm:w-[35%] w-20 sm:p-2 p-1 '/> */}
   
    <FaCirclePlus size={42} className='bg-red-500 rounded-full' onClick={handlePostBox}/>
      <div className='flex align-center w-12 sm:h-12 sm:w-12 h-12 border-cyan-500  border-2 rounded-full '></div> 
   {token?<div className='flex cursor-pointer' onClick={handleClick}>
    <IoIosLogOut size={22} className='text-white m-1'/>
    <div className=' h-[9%] text-white '>Logout</div>
   </div>:<div className='flex cursor-pointer' >
   <GoSignIn className='text-white m-3'/>
   <Link to="/login"> <div className=' h-[9%] m-2  text-white text-lg '>Signin</div></Link>
   </div>
   }
   </div>

   </> 
  )
}
export default Header