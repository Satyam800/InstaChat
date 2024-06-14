import React, { useEffect, useRef, useState } from "react";
import { IoMdPhotos } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { PostCard } from "../slice/postSlice";
import { toast } from "react-toastify";
import { tweetPost } from "../slice/postSlice";
import { postBox } from "../slice/postSlice";
const PostBox = () => {
  const [cancelBox, setcancelBox] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  const postBoxRef = useRef(null);
  const dispatch = useDispatch();
  const textRef = useRef();
  const CancelPostBox = () => {
    dispatch(PostCard(false));
    dispatch(postBox(false))
  };
  useEffect(() => {}, [])

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFile((selectedFile) => [...selectedFile, ...files]);
    console.log(files, "file");
  };

  const handleRemovePoto = (index) => {
    const filterListPhoto = selectedFile.filter((i, j) => {
      if (j !== index) {
        return i;
      }
    });
    setSelectedFile(filterListPhoto);
  };

  const handlePost = () => {
    if(textRef.current.value==""&&selectedFile.length==0){
      toast("Invalid Post")
      return
    }
    dispatch(postBox(false))

    console.log(JSON.parse(localStorage.getItem("id")), "text");
    const formdata = new FormData();
    formdata.append("text", textRef.current.value);
    formdata.append("user",JSON.parse(localStorage.getItem("id"))._id)
    selectedFile.forEach((i, j) => {
      formdata.append(`image`, i);
    });
    dispatch(PostCard(false));
    dispatch(tweetPost(formdata));
  };

  return (
    <div className="h-full w-full bg-black opacity-80 z-100 overflow-y-scroll  no-scrollbar ">
      <div
        className="flex flex-col absolute top-[20%] left-[23%] sm:left-[31%]  h-[60%]  sm:w-[40%] w-[70%] bg-zinc-200 opacity-100 overflow-y-scroll"
        ref={postBoxRef}
      >
        <RxCrossCircled
          size={32}
          className="absolute left-[95%] cursor-pointer"
          onClick={CancelPostBox}
        />
        <div className="m-3 z-100"> Create a Post</div>
        <textarea
          className="ml-9 h-[30%] w-[70%] rounded-lg p-4 focus:outline-none  shadow-md"
          placeholder="write a something"
          ref={textRef}
        />

        {selectedFile && (
          <div className="flex flex-col gap-2 p-4 w-[70%] h-[70%] sm:ml-[10%] ml-[16%] rounded-lg overflow-y-scroll overflow-x-hidden">
            {selectedFile.map((file, index) => {
              return (
                <div className="bg-red-100">
                  <RxCrossCircled
                    size={22}
                    className="relative cursor-pointer bg-orange-600 left-[99%]"
                    onClick={() => handleRemovePoto(index)}
                  />
                  <img src={URL.createObjectURL(file)} alt="image/upload" />
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-around m-3">
          <div className="flex bg-slate-400 p-2 rounded-lg align-baseline">
            <label className="flex cursor-pointer  bg-blue-400 hover:bg-blue-700 text-white font-bold  rounded">
              <IoMdPhotos size={20} className="ml-4" />
              photo/GIF
              <input
                type="file"
                className="hidden"
                onChange={handleFileInput}
              />
            </label>
          </div>

          <button
            className="bg-slate-400 p-2 h-10 w-16 rounded-lg"
            onClick={handlePost}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostBox;
