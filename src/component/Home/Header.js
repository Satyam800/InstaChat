import {name,email} from "../../utils/constant"
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { IoIosLogOut } from "react-icons/io";
import { GoSignIn } from "react-icons/go";
import { Link } from 'react-router-dom';
import { FaCirclePlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { PostCard, userSearch,postBox } from '../../slice/postSlice';
import { FaCircleUser } from "react-icons/fa6";
import Search from '../search';
import { IoSearchOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { userSearchProfile } from '../../slice/postSlice';

import PostBox from '../postBox';
const Header = () => {
  const [signin,SetSignIn]=useState(true)
  const [logout,SetLogout]=useState(false)
  const [isPostPopUp,setisPopUp]=useState(false)
  const editProfile=useSelector(store=>store.post.profiles)
  const token=localStorage.getItem("token")
  const dispatch=useDispatch()
  const isBox=useSelector(store=>store.post.postBox)
const handleClick=()=>{
  localStorage.removeItem("id")
  localStorage.removeItem("token")
  SetLogout(true)
}

useEffect(()=>{
console.log(editProfile,"header");
},[editProfile])

const handlePostBox=()=>{
 dispatch(PostCard(true))
 setisPopUp(true)
 dispatch(postBox(true))
}

useEffect(()=>{
  setisPopUp(false)
   
},[isBox])

useEffect(()=>{

},[logout,token])

const [suggs,setSuggs]=useState(false)
const [isSearch,setisSearch]=useState(false)
 const users=useSelector(store=>store.post.searchProfile)
    const handleSearch=(e)=>{
console.log(e.target.value)
dispatch(userSearch({
  name:e.target.value.toLowerCase()
}))
    }
    useEffect(()=>{
console.log(users,"userSeracxh")
    },[users])

    const handleUser=(i)=>{
      console.log(i.user,"userinnnng")
      dispatch(userSearchProfile({
        user:i.user
      }))
    }

  return (
    <> 
    
    <div className='z-100 absolute p-4 sm:h-full sm:w-[20%]  sm:top-0 bottom-0 w-full justify-between  flex sm:flex-col  flex-row sm:shadow-none bg-zinc-100 shadow-2xl  '>
    <div className='z-100 sm:flex hidden justify-start   rounded-full '>
     <Link to='/'> <img src='https://twitterapplication.s3.ap-south-1.amazonaws.com/color_logo-wm-lm_dimensions.png' className='h-16 w-16 rounded-full'/></Link>
    </div>
  {/* <div className='flex rounded-full h-10 bg-white text-slate-900 focus:bg-amber-600 '></div> */}
  <CiSearch size={22} className='sm:m-2 mt-2 h-8 w-8 border-red-500 border-2 bg-white rounded-full' onClick={()=>setisSearch(true)}/>

 {isSearch? <div className='z-200 fixed top-0 left-0 h-screen w-screen bg-black opacity-80'>
    <RxCross1 size={32} className='absolute left-[80%] top-5 bg-slate-50 rounded-full cursor-pointer' onClick={()=>setisSearch(false)}/>
    <div className='absolute  sm:left-[32%] left-[5%] top-[9%] sm:w-[30%] w-[80%] h-[45%] bg-slate-800 rounded-md'>
      <IoSearchOutline size={22} className='absolute left-[20%] top-3'/>
<div className=''>
<input type='text' placeholder="search"
onChange={handleSearch}
onFocus={()=>setSuggs(true)} 
className='z-100 ml-[20%] mt-1 px-6 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[57%] rounded-md sm:text-sm focus:ring-1'/>
{suggs?<div className='flex flex-col justify-evenly ml-[20%] w-[57%] h-auto p-1 bg-slate-300 '>
{
 users? users?.map((i)=>{
    return <div  >
    <Link to={`/searchProfile/${i.fname}`}>
    <div className='flex justify-stretched w-full h-8 text-black font-bold cursor-pointer' onClick={()=>handleUser(i)}>
        <img src={i.image[0]} className='w-8 h-8 mr-5 rounded-full border-2 border-dashed border-blue-400'/>
        {i.fname}
      </div>
    </Link>
    </div>
  }):null
}
</div>:null}
</div>
           
    </div>

</div>:null}

    {/* <input type='text' className='rounded-full focus:outline-none sm:w-[35%] w-20 sm:p-2 p-1 '/> */}
   
    <FaCirclePlus size={42} className='bg-red-500 rounded-full' onClick={handlePostBox}/>
      <Link to='/user'>{editProfile? <img src={editProfile?.image[0]}  className='h-12 w-12 rounded-full  border-dotted border-2 border-indigo-600'/>:<FaCircleUser size={38} className=' '/>}</Link>
     
   {token&&!logout?<div className='flex cursor-pointer' onClick={handleClick}>
    <IoIosLogOut size={22} className=' m-1'/>
   <div className=' h-[9%]  '>Logout</div>
   </div>:<div className='flex cursor-pointer' >
   <GoSignIn className=' m-3'/>
   <Link to="/login"> <div className=' h-[9%] m-2   text-lg '>Signin</div></Link>
   </div>
   }
   </div>

   </> 
  )
}
export default Header