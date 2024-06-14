import { extraReducers, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../utils/constant";

export const tweetPost = createAsyncThunk("post", async (data) => {
  console.log(data, "data");
  const res = await axios.post(`${URL}/tweets`, data);
  console.log(res, "res");
  return res?.data?.data;
});

export const fetchTweet = createAsyncThunk("fetchTweet", async (data) => {
  console.log(data, "fetchTweet");
  const res = await axios.post(`${URL}/getTweet`, data);
  console.log(res, "tweetfetch");
  return res?.data?.data;
});

export const profile = createAsyncThunk("profile", async (data) => {
  const res = await axios.post(`${URL}/profile`, data);
  console.log(res, "res");
  return res?.data?.data;
});

export const profileFetch = createAsyncThunk("updateProfile", async (data) => {
  const res = await axios.post(
    `${URL}/profilefetch`,
    data
  );
  console.log(res, "resfetch");
  return res?.data?.data;
});

export const userSearch = createAsyncThunk("userSearch", async (data) => {
  console.log(data, "datttta");
  const res = await axios.post( `${URL}/userSearch`, data);
  console.log(res, "resfetch");
  return res?.data?.data;
});

export const userSearchProfile = createAsyncThunk(
  "userSearchProfile",
  async (data) => {
    const res = await axios.post(
       `${URL}/profilefetch`,
      data
    );
    console.log(res, "resfetch mmmm mmmm mmmm");
    return res?.data?.data;
  }
);

export const Like = createAsyncThunk("like", async (data) => {
  const res = await axios.post(`${URL}/like`, data);
  console.log(res, "resfetch");
  return res?.data?.data;
});

export const fetchLike = createAsyncThunk("likes", async (data) => {
  const res = await axios.post(`${URL}/InstaLike`, data);
  console.log(res, "resfetch");
  return res?.data?.data;
});

export const postComment = createAsyncThunk("comment", async (data) => {
  console.log(data);
  const res = await axios.post(
    `${URL}/InstaComment`,
    data
  );
  console.log(res, "coommfetch");
  return res?.data
})

export const postBookmark = createAsyncThunk("bookmark", async (data) => {
  console.log(data);
  const res = await axios.post(
    `${URL}/bookmark`,
    data
  );
  console.log(res, "coommfetch");
  return res?.data?.data
});

export const AllComment = createAsyncThunk("comments", async (data) => {
  console.log(data);
  const res = await axios.post(
    `${URL}/InstaCommentAll`,
    data
  );
  console.log(res, "coommfetch");
  return res?.data
});

export const following=createAsyncThunk("follwoing",async(data)=>{
  const res = await axios.post(
    `${URL}/following`,
    data
  );
  console.log(res, "opopopop");
  return res?.data?.data
})

export const follow=createAsyncThunk("follow",async(data)=>{
  const res = await axios.post(
    `${URL}/follow`,
    data
  );
  console.log(res, "ioioii");
  return res?.data?.data
})

export const followingProfile=createAsyncThunk("followingProfile",async(data)=>{
  const res = await axios.post(
    `${URL}/followingProfile`,
    data
  );
  console.log(res, "ioioii");
  return res?.data?.data
})

export const followingFeed=createAsyncThunk("feed",async(data)=>{
  const res = await axios.post(
    `${URL}/followingFeed`,
    data
  );
  console.log(res, "ioioii");
  return res?.data?.data
})

export const mostLiked=createAsyncThunk("mostLiked",async(data)=>{
  const res = await axios.post(
    `${URL}/mostLiked`,
    data
  );
  console.log(res, "ioioii");
  return res?.data
})

export const hastagTweet=createAsyncThunk('hastag',async(data)=>{
  console.log(data,"hashtag");
  const res = await axios.post(
    `${URL}/hashtag`,
    data
  );
  console.log(res, "hashtag");
  return res?.data?.list
})
export const hastagResult=createAsyncThunk('hastagResult',async(data)=>{
  console.log(data,"hashtag");
  const res = await axios.post(
    `${URL}/hashtagResult`,
    data
  );
  console.log(res, "hashtag");
  return res?.data?.list
})
const postSlice = createSlice({
  name: "post",
  initialState: {
    postBox: false,
    create: [],
    profiles: "",
    searchProfile: "",
    specificProfile: "",
    box: false,
    like: [],
    isComment: false,
    Comment: [],
    bookmark:[],
    followings:[],
    followingProfiles:[],
    followingFeed:[],
    mostLike:[],
    hastagSugg:[],
    hashtagResults:[]
  },
  reducers: {
    PostCard: (state, action) => {
      state.postBox = action.payload
    },
    postBox: (state, action) => {
      state.box = action.payload
    },
    isComments: (state, action) => {
      state.isComment = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(tweetPost.fulfilled, (state, action) => {
        console.log(action.payload, "bb");
        state.create = action?.payload
      })
      .addCase(profile.fulfilled, (state, action) => {
        console.log(action.payload, "profile");
        state.profiles = action.payload?._doc;
      })
      .addCase(profileFetch.fulfilled, (state, action) => {
        console.log(action.payload, "profile");
        state.profiles = action.payload;
      })
      .addCase(userSearch.fulfilled, (state, action) => {
        console.log(action.payload, "userserach");
        state.searchProfile = action.payload;
      })
      .addCase(userSearchProfile.fulfilled, (state, action) => {
        console.log(action.payload,"hhkvhjvgjjvjccccccccccccccccccccccccccc");
        state.specificProfile = action.payload;
      })
      .addCase(fetchTweet.fulfilled, (state, action) => {
        console.log(action.payload, "dscscsc");
        state.create = action.payload;
      })
      .addCase(Like.fulfilled, (state, action) => {
        console.log(action.payload, "dscscsc");
        state.like = action.payload;
      })
      .addCase(fetchLike.fulfilled, (state, action) => {
        console.log(action.payload, "likc");
        state.like = action.payload;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        console.log(action.payload, "commnc");
        state.Comment=action.payload;
      }).addCase(AllComment.fulfilled, (state, action) => {
        console.log(action.payload, "commncAlll");
        state.Comment=action.payload;
      }).addCase(postBookmark.fulfilled, (state, action) => {
        console.log(action.payload, "bookmark");
        state.bookmark=action.payload;
      }).addCase(following.fulfilled,(state,action)=>{
        console.log("followind",action.payload)
        state.followings=action.payload
      }).addCase(followingProfile.fulfilled,(state,action)=>{
        console.log("followindgg",action.payload)
        state.followingProfiles=action.payload
      }).addCase(followingFeed.fulfilled,(state,action)=>{
        console.log("followingfed",action.payload)
        state.create=action.payload
      }).addCase(mostLiked.fulfilled,(state,action)=>{
        console.log("followingfedgccgnccncnngcncg",action.payload)
        state.create=action.payload?.data
      }).addCase(hastagTweet.fulfilled,(state,action)=>{
        console.log("followingfedgccgnccncnngcncg",action.payload)
        state.hastagSugg=action.payload
      }).addCase(hastagResult.fulfilled,(state,action)=>{
        console.log("f",action.payload)
        state.create=action.payload
      })
  },
});

export const { PostCard, postBox, isComments } = postSlice.actions;
export default postSlice.reducer;
