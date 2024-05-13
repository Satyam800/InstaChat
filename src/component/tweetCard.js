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

const TweetCard = ({ data, profile }) => {
  const postTweet = useSelector((store) => store.post.create);
  const editProfile = useSelector((store) => store.post.profiles);
  const user = JSON.parse(localStorage.getItem("id"))?._id;
  const [like,setLike]=useState(false)
  const [gif,setGif]=useState("https://twitterapplication.s3.ap-south-1.amazonaws.com/Animation+-+1715602841040.gif")
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      profileFetch({
        user: user,
      })
    );
  }, []);
  useEffect(() => {
    console.log(data.image, "ppposst");
  }, [postTweet]);

const handleLike=(id)=>{
  console.log(id,"id");
  setLike(true)
  setTimeout(()=>{
    setGif("")
  },3000)
}

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
      gif?<img src={gif} className="h-12 w-12 p-2 rounded-full" />:<GoHeartFill size={29} />:
       <GoHeart size={29} onClick={()=>handleLike(data?._id)} />}

        <FaComments size={29} />

        <IoBookmarkOutline size={29} />
      </div>
    </div>
  );
};

export default TweetCard;
