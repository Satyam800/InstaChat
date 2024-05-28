import React,{useRef} from 'react'
import { IoMdSend } from "react-icons/io";
import { useDispatch,useSelector } from 'react-redux';
import { isComments,postComment } from '../slice/postSlice';
const Reply = ({placeholder,id,type}) => {
    const commentRef=useRef(null)
    const user = JSON.parse(localStorage.getItem("id"))?._id;
    const editProfile = useSelector((store) => store.post.profiles);
    const dispatch=useDispatch()

    const handleComment=()=>{
        if(commentRef.current.value=="") return
      dispatch(isComments(false))
    console.log(commentRef.current.value);
     
       dispatch(postComment(
      { 
        user:user,
        postId:id,
        content:commentRef.current.value,
        onModel:"Tweet",
        profile:editProfile?._id,
        type:type
      }
       ))
       commentRef.current.value=""
    }
  return (
    <div className='flex align-baseline bg-white pl-[4%] '>
      <img src={editProfile.image?.[0]} className='h-10 w-10 rounded-full mr-3'/>
       <input ref={commentRef} placeholder={placeholder} className='mt-1 px-3 py-2 bg-white border shadow-sm h-full border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[70%] rounded-md sm:text-sm focus:ring-1'/>
       <IoMdSend size={29} className='m-2' onClick={handleComment}/>
    </div>
  )
}

export default Reply