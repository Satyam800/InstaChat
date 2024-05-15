import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileFetch } from "../slice/postSlice";
import { formatDistanceToNow } from "date-fns";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ImageCarousel from "./imageCarousel";
import moment from "moment";
import { FaComments } from "react-icons/fa6";
import { Like ,fetchLike} from "../slice/postSlice";
import Reply from "./reply";
import { isComments } from "../slice/postSlice";
import { AllComment } from "../slice/postSlice";
const TweetCard = ({ data, profile }) => {
  const postTweet = useSelector((store) => store.post.create);
  const editProfile = useSelector((store) => store.post.profiles);
  const user = JSON.parse(localStorage.getItem("id"))?._id
  const [like,setLike]=useState(false)
  const [gif,setGif]=useState("https://twitterapplication.s3.ap-south-1.amazonaws.com/Animation+-+1715602841040.gif")
  const dispatch = useDispatch();
  const [iscommentClicked,setIscommentClicked]=useState(false)
  const parentComment=useSelector(store=>store.post.Comment)
  useEffect(() => {
    dispatch(
      profileFetch({
        user: user
      })
    )
    dispatch(fetchLike(
     { user:user}
    ))
  }, []);
  useEffect(() => {
    console.log(data.image, "ppposst");
  }, [postTweet]);

const handleLike=(id)=>{
  dispatch(Like({
    id:id,
    user:user,
    onModel:"Tweet"
  }))
  console.log(id,"id");
  setLike(true)
  setTimeout(()=>{
    setGif("")
  },5000)
}
const handleDislike=(id)=>{
  dispatch(Like({
    id:id,
    user:user,
    onModel:"Tweet"
  }))
  setGif("https://twitterapplication.s3.ap-south-1.amazonaws.com/Animation+-+1715602841040.gif")
  setLike(false)
}

const likedPost=useSelector(store=>store.post.like)
useEffect(()=>{
console.log(likedPost,"likePst");
likedPost.map((i)=>{
  if(data?._id==i.postId._id){
    setGif("")
    setLike(true)
  }
})

},[likedPost])
const isCommenting=useSelector(store=>store.post.isComment)
useEffect(()=>{

},[isCommenting])

const handleComment=(id)=>{
  dispatch(AllComment({
    postId:id,
  }))
  dispatch(isComments(true))
  setIscommentClicked(true)
}
useEffect(()=>{
console.log(parentComment,"[arentComment");
},[parentComment?.data])
  return (

    <div className="z-10 h-auto w-[70%]  shadow-md rounded-md justify-evenly m-4 border-1 bg-gradient-to-b from-slate-100 to-slate-300 ">
      <div className="flex justify-start ">
        <div className="flex m-2">
          <img
            src={profile?.image?.[0]}
            className="h-8 w-8 mr-4  rounded-full"
          />
          <div className="text-black">{profile?.fname}</div>
        </div>
        <div className="text-xs font-serif text-slate-600 m-3 ml-[20%] ">
          {formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })}
        </div>
      </div>
      <hr />
      <div className="flex text-blue-500 w-full h-auto p-4 ">
        {data?.content}
      </div>
      <hr className="w-full relative bg-black -z-10" />
      <ImageCarousel image={data?.image} />
      <hr />
      <div className="flex m-2 justify-evenly">
       { like?
      gif?<img src={gif} className="h-12 w-12 p-2 rounded-full" />:<GoHeartFill size={29} onClick={()=>handleDislike(data?._id)} />:
       <GoHeart size={29} onClick={()=>handleLike(data?._id)} />
       }

        <FaComments size={29} onClick={()=>handleComment(data?._id)} />

        <IoBookmarkOutline size={29} />
      </div>
{  isCommenting&&iscommentClicked?    <Reply placeholder="Add a comment..." id={data?._id} />:null
}   
<div className="flex flex-col overflow-y-scroll h-min-12 h-max-44 p-6">

{
parentComment.postId==data?._id? <div className="h-40">
  { parentComment?.data?.map((i)=>{
    return <div className="py-2">
      {i.content}
    </div>
  })}
</div>:null
}

</div>
 </div>
  );
};

export default TweetCard;
