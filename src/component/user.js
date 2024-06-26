import React, { useEffect, useState, useRef } from "react"
import { FaCircleUser } from "react-icons/fa6"
import { FcSwitchCamera } from "react-icons/fc"
import { useDispatch, useSelector } from "react-redux"
import { RxCross1 } from "react-icons/rx"
import { profile, profileFetch } from "../slice/postSlice"
import { MdOutlineGridOn } from "react-icons/md"
import { CiBookmarkCheck } from "react-icons/ci"
import { fetchTweet, postBookmark } from "../slice/postSlice"
import TweetCard from "./tweetCard"
const User = () => {
  const userName = JSON.parse(localStorage.getItem("id"))?.name
  const user = JSON.parse(localStorage.getItem("id"))?._id
  const [selected, setSelected] = useState(true)
  const [isEdit, setisEdit] = useState(false)
  const [dp, setdp] = useState("")
  const fnameRef = useRef()
  const lnameRef = useRef()
  const urlref = useRef()
  const bioRef = useRef()
  const dispatch = useDispatch()
  const editProfile = useSelector((store) => store.post.profiles)
  const handleDP = (e) => {
    console.log(e.target.files[0])
    setdp(e.target.files[0])
  };
  const handleLogout = () => {
    localStorage.removeItem("id")
    localStorage.removeItem("token")
  };
  useEffect(() => {
    console.log(editProfile, "edit")
  }, [editProfile])

  useEffect(() => {
    dispatch(
      profileFetch({
        user: user,
      })
    );
    dispatch(
      fetchTweet({
        user: user,
      })
    );
  }, []);

  const tweet = useSelector((store) => store.post.create)
  const bookmark = useSelector((store) => store.post.bookmark)

  useEffect(() => {
    console.log(tweet, "tweet")
  }, [bookmark, tweet])

  const handleSave = () => {
    setisEdit(false);
    const formdata = new FormData();
    formdata.append("fname", fnameRef.current.value)
    formdata.append("lname", lnameRef.current.value)
    formdata.append("url", urlref.current.value)
    formdata.append("bio", bioRef.current.value)
    formdata.append("user", user)
    formdata.append("image", dp)
    dispatch(profile(formdata))
  };

  const handleMyBookmark = () => {
    setSelected(false);
    dispatch(
      postBookmark({
        user: user,
      })
    );
  };

  const handleMyPost = () => {
    setSelected(true)
    dispatch(
      fetchTweet({
        user: user,
      })
    )
  }

  return (
    <div>
      {isEdit ? (
        <div className="w-screen h-screen bg-black opacity-70">
          <div className=" top-[14%] sm:left-[30%] left-0">
            <RxCross1
              size={32}
              className="absolute sm:left-[90%] left-[80%] top-12 bg-slate-50 rounded-full"
              onClick={() => setisEdit(false)}
            />

            <div className="absolute top-[20%] left-[30%] flex flex-col h-[70%] w-[30%] justify-evenly gap-y-5">
              <div className="flex">
                <label className=" h-32 w-32  rounded-full cursor-pointer">
                  <input type="file" className="hidden" onChange={handleDP} />
                  {dp?<img     
                  className="h-32 w-32 rounded-full"          
                  src={URL.createObjectURL(dp)}
                  />:<FaCircleUser size={120} className="absolute m-1" />}
                  <FcSwitchCamera
                    size={32}
                    className="absolute top-[25%] sm:left-[17%] left-[30%]"
                  />
                </label>
              </div>

              <input
                placeholder="name"
                ref={fnameRef}
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              />

              <input
                placeholder="user_name"
                ref={lnameRef}
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              />

              <input
                placeholder="url"
                ref={urlref}
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              />

              <input
                placeholder="Bio"
                ref={bioRef}
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              />

              <button
                className="w-32 h-8 bg-red-500 rounded-lg text-black font-semibold"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className=" sm:ml-[25%] ml-3     sm:w-[40%] w-[80%] sm:h-[40%] h-[45%] bg-white shadow-sm rounded-md sm:p-5 p-1">
            <div
              className={` flex h-32 w-32 ${
                editProfile ? "bg-white" : "bg-pink-300"
              } rounded-full cursor-pointer`}
            >
              {editProfile ? (
                <img
                  src={editProfile?.image?.[0]}
                  className="relative m-1 h-[90%] w-[90%] rounded-full border-dotted border-2 border-indigo-600"
                />
              ) : (
                <FaCircleUser size={120} className="absolute m-1" />
              )}
            </div>
            <div className="flex w-[50%] justify-between py-5 text-red-300">
              <div>posts</div>
              <div>follower</div>
              <div>following</div>
            </div>
            <div className="py-2 m-1">
              {editProfile ? null : (
                <div className="text-xl font-serif">{userName}</div>
              )}
              <div className="text-xl font-serif">{`${editProfile?.fname} ${editProfile?.lname}`}</div>
              <div>{editProfile?.bio}</div>
              <a>{editProfile?.url}</a>
            </div>

            <div
              className="  w-[50%] pl-[17%] h-6 bg-slate-200 rounded-md shadow-lg cursor-pointer"
              onClick={() => setisEdit(true)}
            >
              Edit profile
            </div>
            <div
              className="  w-[50%] pl-[21%] h-6 mt-3 rounded-md shadow-lg bg-green-400 cursor-pointer "
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>

          <hr className=" mt-5 w-full  bg-slate-500" />
        </div>
      )}

      <div className="flex justify-evenly ">
        <div
          onClick={handleMyPost}
          className="w-9 h-9  rounded-b-3xl hover:bg-yellow-400"
        >
          <MdOutlineGridOn size={35} className="cursor-pointer" />
        </div>
        <div
          onClick={handleMyBookmark}
          className="w-9 h-9  rounded-b-3xl hover:bg-yellow-400"
        >
          <CiBookmarkCheck size={35} className="cursor-pointer" />
        </div>
      </div>

      <div className="absolute  sm:w-[50%] w-full sm:ml-[28%] ml-0">
        {selected
          ? tweet.map((i) => {
              return <TweetCard data={i} key={i?._id} />;
            })
          : bookmark.map((i) => {
              return (
                <TweetCard data={i.postId} key={i?._id} time={i?.createdAt} />
              );
            })}
      </div>
    </div>
  );
};

export default User;
