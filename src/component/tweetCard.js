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
import { Like, fetchLike } from "../slice/postSlice";
import Reply from "./reply";
import { isComments } from "../slice/postSlice";
import { AllComment } from "../slice/postSlice";
import { FaCircleUser } from "react-icons/fa6";
import { ReactSVG } from "react-svg";
import { postBookmark } from "../slice/postSlice";
const TweetCard = ({ data, profile, time }) => {
  const postTweet = useSelector((store) => store.post.create);
  const editProfile = useSelector((store) => store.post.profiles);
  const user = JSON.parse(localStorage.getItem("id"))?._id;
  const [like, setLike] = useState(false);
  const [gif, setGif] = useState(
    "https://twitterapplication.s3.ap-south-1.amazonaws.com/Animation+-+1715602841040.gif"
  );
  const dispatch = useDispatch();
  const [iscommentClicked, setIscommentClicked] = useState(false);
  const parentComment = useSelector((store) => store.post.Comment);
  useEffect(() => {
    dispatch(
      profileFetch({
        user: user,
      })
    );
    dispatch(fetchLike({ user: user }));
    dispatch(
      postBookmark({
        user: user,
      })
    );
  }, []);
  useEffect(() => {}, [postTweet]);

  const handleLike = (id) => {
    dispatch(
      Like({
        id: id,
        user: user,
        onModel: "Tweet",
      })
    );
    setLike(true);
    setTimeout(() => {
      setGif("");
    }, 5000);
  };
  const handleDislike = (id) => {
    dispatch(
      Like({
        id: id,
        user: user,
        onModel: "Tweet",
      })
    );
    setGif(
      "https://twitterapplication.s3.ap-south-1.amazonaws.com/Animation+-+1715602841040.gif"
    );
    setLike(false);
  };

  const likedPost = useSelector((store) => store.post.like);
  useEffect(() => {
    console.log(likedPost, "alphabet");
    likedPost.map((i) => {
      if (data?._id == i.postId) {
        setGif("");
        setLike(true);
      }
    });
  }, [likedPost]);
  const isCommenting = useSelector((store) => store.post.isComment);
  useEffect(() => {}, [isCommenting]);

  const handleComment = (id) => {
    dispatch(
      AllComment({
        postId: id,
      })
    );
    dispatch(isComments(true));
    setIscommentClicked(true);
  };
  useEffect(() => {}, [parentComment?.data]);

  const [isreply, setIsReply] = useState(false);
  const [replyId, setReplyId] = useState("");
  const [replies, setReplies] = useState(false);
  const [isBoomark, setIsBookmark] = useState(false);
  const handleReply = (id) => {
    setReplyId(id);
    setIsReply(!isreply);
  };
  const handleReplies = (id) => {
    setReplies(!replies);
    setReplyId(id);
  };
  const handleBookmark = (id) => {
    dispatch(
      postBookmark({
        user: user,
        postId: id,
      })
    );
    if (isbookmark == true) {
      setisbookmark(false);
    }
  };
  const bookmark = useSelector((store) => store.post.bookmark);
  const [isbookmark, setisbookmark] = useState(false);
  useEffect(() => {
    console.log(bookmark,data,"vsfvsfbfdbfdbfdbfdbgdbgdb");
    bookmark?.map((i) => {
      if (i.postId?._id == data?._id) {
        setisbookmark(true);
      }
    });
  }, [bookmark]);
  return (
    <div className="z-10 h-auto w-[70%]  shadow-md rounded-md justify-evenly mb-4 mt-4 sm:ml-[7%] ml-[12%] border-1 bg-gradient-to-l from-teal-200 to-yellow-100 ">
      <div className="flex justify-start ">
        <div className="flex m-2">
          <img
            src={data?.profile?.image?.[0]}
            className="h-8 w-8 mr-4  rounded-full"
          />
          <div className="text-black">{profile?.fname}</div>
        </div>
        <div className="text-xs font-serif text-slate-600 m-3 ml-[20%] ">
          {!time
            ? formatDistanceToNow(new Date(data?.createdAt), {
                addSuffix: true,
              })
            : formatDistanceToNow(new Date(time), { addSuffix: true })}
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
        {like ? (
          gif ? (
            <img src={gif} className="h-12 w-12 p-2 rounded-full" />
          ) : (
            <GoHeartFill size={29} onClick={() => handleDislike(data?._id)} />
          )
        ) : (
          <GoHeart size={29} onClick={() => handleLike(data?._id)} />
        )}

        <FaComments size={29} onClick={() => handleComment(data?._id)} />

        {isbookmark ? (
          <IoBookmark size={29} onClick={() => handleBookmark(data?._id)} />
        ) : (
          <IoBookmarkOutline
            size={29}
            onClick={() => handleBookmark(data?._id)}
          />
        )}
      </div>
      {isCommenting && iscommentClicked ? (
        <Reply placeholder="Add a comment..." id={data?._id} type="comment" />
      ) : null}
      <div
        className={`flex flex-col overflow-y-scroll bg-wewak-200 ${
          iscommentClicked ? "h-44 p-6" : "h-0"
        }`}
      >
        {parentComment.postId == data?._id ? (
          <div className="h-min-1 h-max-40">
            {parentComment?.data?.map((i) => {
              return (
                <div className=" py-2 align-baseline">
                  <div className="flex">
                    <span>
                      {i.profile?.image?.length == 0 ? (
                        <FaCircleUser size={22} />
                      ) : (
                        <img
                          src={i.profile?.image?.[0]}
                          className=" h-8 w-8 rounded-full mr-5"
                        />
                      )}
                    </span>
                    <div className="relative w-auto h-auto p-2 bg-rose-200 rounded-r-lg">
                      <img
                        src="https://twitterapplication.s3.ap-south-1.amazonaws.com/icons8-triangle-40.png"
                        className="h-3 w-3 absolute top-[93%] left-[1%] bg-black rounded-full"
                      />
                      <div className="text-xs font-sans pb-1">
                        {i.userId?.name}
                      </div>
                      {i.content}
                    </div>
                    <span
                      className="m-3 w-20 cursor-pointer bg-black opacity-30 text-white rounded-md p-1 py-1"
                      onClick={() => handleReply(i?._id)}
                    >
                      Reply...
                    </span>
                    <div></div>
                  </div>
                  <div className="py-4">
                    {isreply && i?._id == replyId ? (
                      <Reply placeholder="Reply..." id={i?._id} type="reply" />
                    ) : null}
                  </div>
                  <div className="ml-[14%] flex flex-col ">
                    {i.comments.map((i) => {
                      return (
                        <div>
                          <div className="flex w-min-[20%] w-max-auto py-2">
                            <span>
                              {i.profile?.image?.length == 0 ? (
                                <FaCircleUser size={22} />
                              ) : (
                                <img
                                  src={i.profile?.image?.[0]}
                                  className=" h-8 w-8 rounded-full mr-5"
                                />
                              )}
                            </span>
                            <div className="relative  w-auto h-auto p-2 bg-rose-200 rounded-r-lg">
                              <img
                                src="https://twitterapplication.s3.ap-south-1.amazonaws.com/icons8-triangle-40.png"
                                className="h-3 w-3 absolute top-[93%] left-[1%] bg-black rounded-full"
                              />
                              <div className="text-xs font-sans pb-1">
                                {i.userId?.name}
                              </div>
                              {i?.content}
                            </div>
                            <span
                              className="m-3 w-20 cursor-pointer bg-black opacity-30 text-white rounded-md p-1 py-1"
                              onClick={() => handleReplies(i?._id, i.postId)}
                            >
                              Reply...
                            </span>
                          </div>
                          <div className="py-1">
                            {replies && replyId == i._id ? (
                              <Reply
                                placeholder="Reply..."
                                id={i?.postId}
                                type="reply"
                              />
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TweetCard;
