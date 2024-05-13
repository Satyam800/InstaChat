import { extraReducers,createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
export const tweetPost=createAsyncThunk("post",async (data)=>{
  console.log(data,"data");
   const res=await axios.post("http://localhost:3500/api/v1/tweets",data)
   console.log(res,"res");
   return res?.data?.data
})

export const fetchTweet=createAsyncThunk("fetchTweet",async(data)=>{
  console.log(data,"fetchTweet");
  const res=await axios.post("http://localhost:3500/api/v1/getTweet",data)
   console.log(res,"tweetfetch");
   return res?.data?.data

})

export const profile=createAsyncThunk('profile',async(data)=>{
  const res=await axios.post("http://localhost:3500/api/v1/profile",data)
  console.log(res,"res");
  return res?.data?.data
})

export const profileFetch=createAsyncThunk("updateProfile",async(data)=>{
  const res=await axios.post("http://localhost:3500/api/v1/profilefetch",data)
  console.log(res,"resfetch");
  return res?.data?.data
})

export const userSearch=createAsyncThunk("userSearch",async(data)=>{
  console.log(data,"datttta");
  const res=await axios.post("http://localhost:3500/api/v1/userSearch",data)
  console.log(res,"resfetch");
  return res?.data?.data
})

export const userSearchProfile=createAsyncThunk("userSearchProfile",async(data)=>{
  
  const res=await axios.post("http://localhost:3500/api/v1/userSearch",data)
  console.log(res,"resfetch");
  return res?.data?.data
})



const postSlice= createSlice({
    name: "post",
    initialState: {
    postBox:false,
    create:[],
    profiles:"",
    searchProfile:"",
    specificProfile:"",
    box:false
    },
    reducers: {
      PostCard:(state,action)=>{
        state.postBox=action.payload
      },
      postBox:(state,action)=>{
        state.box=action.payload
      }
    },
    extraReducers:(builder)=>{
      builder.addCase(tweetPost.fulfilled,(state,action)=>{
        console.log(action.payload,"bb");
        state.create=action.payload.reverse()
      }).addCase(profile.fulfilled,(state,action)=>{
        console.log(action.payload,"profile");
        state.profiles=action.payload?._doc
      }).addCase(profileFetch.fulfilled,(state,action)=>{
        console.log(action.payload,"profile");
        state.profiles=action.payload
      }).addCase(userSearch.fulfilled,(state,action)=>{
        console.log(action.payload,"userserach");
        state.searchProfile=action.payload
      }).addCase(userSearchProfile.fulfilled,(state,action)=>{
        state.specificProfile=action.payload[0]
      }).addCase(fetchTweet.fulfilled,(state,action)=>{
        console.log(action.payload,"dscscsc");
        state.create=action.payload

    })
    }
  })
  

  export const { PostCard,postBox} = postSlice.actions;
  export default postSlice.reducer;